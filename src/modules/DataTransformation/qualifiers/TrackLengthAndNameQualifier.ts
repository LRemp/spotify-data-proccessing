import Track from "../../../classes/Track";
import { IQualifier } from "../../../types/qualifier";
import TrackLengthCriteria from "../criterias/TrackLengthCriteria";
import TrackNameCriteria from "../criterias/TrackNameCriteria";

export default class TrackLengthAndNameQualifier implements IQualifier<Track> {
  private lengthCriteria: TrackLengthCriteria;
  private nameCriteria: TrackNameCriteria;

  constructor() {
    this.lengthCriteria = new TrackLengthCriteria();
    this.nameCriteria = new TrackNameCriteria();
  }

  public qualifies(data: Track) {
    if (
      this.lengthCriteria.qualifies(data) &&
      this.nameCriteria.qualifies(data)
    ) {
      return true;
    }

    return false;
  }
}
