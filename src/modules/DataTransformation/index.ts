import { IExecutable } from "../../types/executable";
import * as fs from "fs";
import * as readline from "readline";
import TrackLengthAndNameQualifier from "./qualifiers/TrackLengthAndNameQualifier";
import Track from "../../classes/Track";

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

  public execute() {
    //Filter the tracks
    this.filterTracks();

    //TODO: filter the artists

    //TODO: explode track release date

    //TODO: transform tracks data
  }

  protected async filterTracks() {
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

    file.on("line", (line: string) => {
      const track: Track = new Track();
      lineCount++;
      try {
        track.parse(line);
        if (this.qualifier.qualifies(track)) {
          out.write(line + "\r\n");
        }
      } catch (err) {
        console.log(`Error parsing line ${lineCount} ${err}`);
      }
    });
  }
}

export default DataTransformation;
