import { IExecutable } from "../../types/executable";

interface IDataTransformation {}

class DataTransformation implements IExecutable, IDataTransformation {
  constructor() {}

  public execute() {
    //TODO: implement data transformation entry point
  }
}

export default DataTransformation;
