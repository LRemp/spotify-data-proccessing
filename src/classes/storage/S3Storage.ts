import { IStorage } from "@/types/storage";
import * as fs from "fs";
import * as AWS from "aws-sdk";

export default class S3Storage implements IStorage {
  private s3: AWS.S3;

  constructor() {
    if (!process.env.AWS_REGION) {
      throw new Error("AWS_REGION environment variable is not set.");
    }
    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new Error("AWS_ACCESS_KEY_ID environment variable is not set.");
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_SECRET_ACCESS_KEY environment variable is not set.");
    }

    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
  }
  public upload(stream: fs.ReadStream, name: string) {
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME environment variable is not set.");
    }

    const params = {
      Bucket: bucketName,
      Key: name,
      Body: stream,
    };

    this.s3.upload(params, (err: Error, data: any) => {
      if (err) {
        console.log("Error uploading file:", err);
      } else {
        console.log(
          "File uploaded successfully. File location:",
          data.Location
        );
      }
    });
  }
}
