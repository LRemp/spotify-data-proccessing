import { IExecutable } from "../../types/executable";
import * as fs from "fs";
import * as readline from "readline";
import TrackLengthAndNameQualifier from "./qualifiers/TrackLengthAndNameQualifier";
import Track from "../../classes/Track";
import TrackDanceabilityTransformation from "./transformations/TrackDanceabilityTransformation";
import ExplodeTrackReleaseDate from "./explosions/ExplodeTrackReleaseDate";
import FileHeaders from "../../config/FileHeaders";

interface IDataTransformation {}

class DataTransformation implements IExecutable, IDataTransformation {
  trackFilePath: string;
  artistsFilePath: string;
  trackFileOutPath: string;
  artistsFileOutPath: string;

  qualifier: TrackLengthAndNameQualifier;

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
  }

  public async execute() {
    //Filter the tracks
    await this.filterTracks();
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
}

export default DataTransformation;
