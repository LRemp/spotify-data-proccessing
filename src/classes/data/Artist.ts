import { IParsable } from "@/types/parasble";

export default class Artist implements IParsable {
  id: string;
  followers: number;
  genres: string[];
  name: string;
  popularity: number;

  constructor();
  constructor(
    id: string,
    followers: number,
    genres: string[],
    name: string,
    popularity: number
  );

  constructor(
    id?: string,
    followers?: number,
    genres?: string[],
    name?: string,
    popularity?: number
  ) {
    this.id = id || "0";
    this.followers = followers || 0;
    this.genres = genres || [];
    this.name = name || "";
    this.popularity = popularity || 0;
  }

  public parse(data: string) {
    const parts: string[] = data.split(",");

    this.id = parts[0];
    this.followers = parseInt(parts[1]);
    this.genres = JSON.parse(parts[2].replace(/'/g, '"'));
    this.name = parts[3];
    this.popularity = parseInt(parts[4]);
  }

  public toString() {
    return "";
  }
}
