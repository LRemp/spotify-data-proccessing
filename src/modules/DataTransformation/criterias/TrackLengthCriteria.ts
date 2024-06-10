import Track from "../../../classes/Track";
import { ICriteria } from "../../../types/criteria";

const minuteMiliseconds = 60 * 10;

export default class TrackLengthCriteria implements ICriteria<Track> {
  public qualifies(data: Track) {
    //Reject if data object does not qualigy the criteria
    if (data.duration_ms < minuteMiliseconds) {
      return false;
    }

    return true;
  }
}
