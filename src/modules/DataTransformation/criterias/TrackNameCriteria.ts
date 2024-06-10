import Track from "../../../classes/Track";
import { ICriteria } from "../../../types/criteria";

export default class TrackNameCriteria implements ICriteria<Track> {
  public qualifies(track: Track) {
    //Reject if data object does not qualigy the criteria
    if (track.name == "" || track.name == undefined) {
      return false;
    }

    return true;
  }
}
