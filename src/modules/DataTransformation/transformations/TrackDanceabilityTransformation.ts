import Track from "@classes/data/Track";

export default function TrackDanceabilityTransformation(data: Track) {
  //Terminate action if danceability of the track is a type of string
  if (typeof data.danceability == "string") return;

  //Asign required string value based on number criteria
  if (data.danceability >= 0 && data.danceability < 0.5) {
    data.danceability = "Low";
  } else if (data.danceability >= 0.5 && data.danceability <= 0.6) {
    data.danceability = "Medium";
  } else {
    data.danceability = "High";
  }
}
