import { Resource } from "sst";
import { bucket } from "./storage";

const apexDomain = `lapalacios.com`;
// const routerDomain = `*.${apexDomain}`;
const baseUrl = `sst-poc.${apexDomain}`;

const router = new sst.aws.Router("MyRouter", {
  domain:
    $app.stage === "luispalacios"
      ? baseUrl
      : {
          name: baseUrl,
          dns: false,
          cert: "arn:aws:acm:us-east-1:251724005896:certificate/70a082ba-3a06-464b-9fb8-0cad425ec018",
        },
});

const params = new sst.Linkable("Params", {
  properties: {
    STAGE: $app.stage,
    appName: $app.name,
  },
});

export const myApi = new sst.aws.Function("MyApi", {
  url: {
    router: {
      domain: baseUrl,
      instance: router,
      path: `/api/${$app.stage}`,
    },
  },
  link: [params, bucket],
  handler: "packages/functions/src/api.handler",
});
