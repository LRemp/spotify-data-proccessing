import { ReadStream } from "fs";

export interface IStorage {
  upload: (stream: ReadStream, name: string) => void;
}
