import "dotenv/config";
import DataTransformation from "./modules/DataTransformation";

const dataTransformation: DataTransformation = new DataTransformation();

dataTransformation.execute();
