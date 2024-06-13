import { IParsable } from "../types/parasble";

export default class Track implements IParsable {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
  explicit: number;
  artists: string[];
  id_artists: string[];
  release_date: string;
  danceability: number | string;
  energy: number;

  constructor();
  constructor(
    id: string,
    name: string,
    popularity: number,
    duration_ms: number,
    explicit: number,
    artists: string[],
    id_artists: string[],
    release_date: string,
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
    release_date?: string,
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
    this.release_date = release_date || "";
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
    this.release_date = parts[7];
    this.danceability = parseFloat(parts[8]);
    this.energy = parseInt(parts[9]);
  }
}
