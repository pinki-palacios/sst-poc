import { Resource } from "sst";
import { Handler } from "aws-lambda";
import { Example } from "@sst-poc/core/example";

export const handler: Handler = async (_event) => {
  console.log("FOO");
  console.error(new Error("MyError"));

  return {
    statusCode: 200,
    body: `${Example.hello()} Linked to ${Resource.MyBucket.name}. STAGE is ${
      Resource.App.stage
    } and appName is ${Resource.Params.appName}.`,
  };
};
