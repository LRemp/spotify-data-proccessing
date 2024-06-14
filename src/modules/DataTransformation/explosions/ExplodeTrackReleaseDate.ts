import Track from "@classes/data/Track";

export default function ExplodeTrackReleaseDate(data: Track) {
  data.year = data.release_date.getFullYear();
  data.month = data.release_date.getMonth() + 1;
  data.day = data.release_date.getDate();
}
