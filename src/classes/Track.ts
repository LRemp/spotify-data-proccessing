import { IParsable } from "../types/parasble";

export default class Track implements IParsable {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
  explicit: number;
  artists: string[];
  id_artists: string[];
  release_date: Date;
  danceability: number | string;
  energy: number;
  year?: number;
  month?: number;
  day?: number;

  constructor();
  constructor(
    id: string,
    name: string,
    popularity: number,
    duration_ms: number,
    explicit: number,
    artists: string[],
    id_artists: string[],
    release_date: Date,
    danceability: number,
    energy: number
  );

  constructor(
    id?: string,
    name?: string,
    popularity?: number,
    duration_ms?: number,
    explicit?: number,
    artists?: string[],
    id_artists?: string[],
    release_date?: Date,
    danceability?: number | string,
    energy?: number
  ) {
    this.id = id || "0";
    this.name = name || "Default name";
    this.popularity = popularity || 0;
    this.duration_ms = duration_ms || 0;
    this.explicit = explicit || 0;
    this.artists = artists || [];
    this.id_artists = id_artists || [];
    this.release_date = release_date || new Date();
    this.danceability = danceability || 0;
    this.energy = energy || 0;
  }

  public parse(data: string) {
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const parts: string[] = data.split(regex);

    this.id = parts[0];
    this.name = parts[1];
    this.popularity = parseInt(parts[2]);
    this.duration_ms = parseInt(parts[3]);
    this.explicit = parseInt(parts[4]);
    this.artists = JSON.parse(
      parts[5]
        .trim()
        .replace(/^"+|"+$/g, "")
        .replace(/'/g, '"')
    );
    this.id_artists = JSON.parse(
      parts[6]
        .trim()
        .replace(/^"+|"+$/g, "")
        .replace(/'/g, '"')
    );
    this.release_date = new Date(parts[7]);
    this.danceability = parseFloat(parts[8]);
    this.energy = parseInt(parts[9]);

    if (parts.length > 10) {
      this.year = parseInt(parts[10]);
      this.month = parseInt(parts[11]);
      this.day = parseInt(parts[12]);
    }
  }

  public toString(): string {
    let result = "";

    result += `${this.id},`;
    result += `${this.name},`;
    result += `${this.popularity},`;
    result += `${this.duration_ms},`;
    result += `${this.explicit},`;
    result += `${JSON.stringify(this.artists)},`;
    result += `${JSON.stringify(this.id_artists)},`;
    result += `${this.release_date.getFullYear()}-${
      this.release_date.getMonth() + 1
    }-${this.release_date.getDate() + 1},`;
    result += `${this.danceability},`;
    result += `${this.energy}`;

    if (this.year) {
      result += `,${this.year},${this.month},${this.day}`;
    }

    return result;
  }
}
