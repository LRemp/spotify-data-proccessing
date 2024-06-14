import { IExecutable } from "@/types/executable";
import * as fs from "fs";
import * as readline from "readline";
import TrackLengthAndNameQualifier from "./qualifiers/TrackLengthAndNameQualifier";
import Track from "@classes/data/Track";
import TrackDanceabilityTransformation from "./transformations/TrackDanceabilityTransformation";
import ExplodeTrackReleaseDate from "./explosions/ExplodeTrackReleaseDate";
import FileHeaders from "@config/FileHeaders";
import Artist from "@classes/data/Artist";
import { IStorage } from "@/types/storage";
import S3Storage from "@classes/storage/S3Storage";
import { IQualifier } from "@/types/qualifier";

interface IDataTransformation {}

class DataTransformation implements IExecutable, IDataTransformation {
  trackFilePath: string;
  artistsFilePath: string;
  trackFileOutPath: string;
  artistsFileOutPath: string;

  qualifier: IQualifier<Track>;

  storage: IStorage;

  constructor();
  constructor(
    trackFilePath: string,
    artistsFilePath: string,
    trackFileOutPath: string,
    artistsFileOutPath: string
  );

  constructor(
    trackFilePath?: string,
    artistsFilePath?: string,
    trackFileOutPath?: string,
    artistsFileOutPath?: string
  ) {
    this.trackFilePath = trackFilePath || "./data/tracks.csv";
    this.artistsFilePath = artistsFilePath || "./data/artists.csv";
    this.trackFileOutPath = trackFileOutPath || "./data/filtered/tracks.csv";
    this.artistsFileOutPath =
      artistsFileOutPath || "./data/filtered/artists.csv";

    this.qualifier = new TrackLengthAndNameQualifier();
    this.storage = new S3Storage();
  }

  public async execute() {
    //Filter the tracks
    await this.filterTracks();

    //Filter the artists
    await this.filterArtists();

    //Upload the generated files
    await this.storage.upload(
      fs.createReadStream(this.trackFileOutPath),
      "tracks.csv"
    );
    await this.storage.upload(
      fs.createReadStream(this.artistsFileOutPath),
      "artists.csv"
    );
  }

  protected async filterTracks() {
    console.log("filtering tracks");
    const file: readline.Interface = readline.createInterface({
      input: fs.createReadStream(this.trackFilePath),
      output: process.stdout,
      terminal: false,
    });

    //Clear the file before the operations
    //fs.exists - deprecated
    if (fs.existsSync(this.trackFileOutPath)) {
      await fs.unlink(this.trackFileOutPath, (err) => {
        if (err) {
          throw new Error(`Error while clearing track out file: ${err}`);
        }

        console.log("Track out file successfuly cleared");
      });
    }

    const out: fs.WriteStream = fs.createWriteStream(this.trackFileOutPath);

    let lineCount = 0;

    out.write(FileHeaders.trackTransformedFileHeader);

    await new Promise((resolve, reject) => {
      file
        .on("line", (line: string) => {
          const track: Track = new Track();
          lineCount++;
          try {
            track.parse(line);

            if (this.qualifier.qualifies(track)) {
              //Apply data transformations
              TrackDanceabilityTransformation(track);

              //Explode required fields for data
              ExplodeTrackReleaseDate(track);

              out.write(track.toString() + "\r\n");
            }
          } catch (err) {
            console.log(`Error parsing line ${lineCount} ${err}`);
          }
        })
        .on("close", () => {
          resolve("ok");
        });
    });
  }

  protected async filterArtists() {
    const out: fs.WriteStream = fs.createWriteStream(this.artistsFileOutPath);

    const tracksFile: readline.Interface = readline.createInterface({
      input: fs.createReadStream(this.trackFileOutPath),
      output: process.stdout,
      terminal: false,
    });

    const tracks: Track[] = [];

    for await (const line of tracksFile) {
      const track: Track = new Track();
      try {
        track.parse(line);
        tracks.push(track);
      } catch (err) {}
    }

    const artistsFile = readline.createInterface({
      input: fs.createReadStream(this.artistsFilePath),
      output: process.stdout,
      terminal: false,
    });

    let lineCount = 0;
    for await (const line of artistsFile) {
      const artist: Artist = new Artist();
      lineCount++;
      try {
        artist.parse(line);

        let numberOfArtistTracks = 0;

        for (var id in tracks) {
          if (tracks[id].artists.includes(artist.name)) {
            numberOfArtistTracks++;
          }
        }

        if (numberOfArtistTracks > 0) {
          out.write(line + "\r\n");
        }
      } catch (err) {}
    }
  }
}

export default DataTransformation;
