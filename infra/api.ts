import { Resource } from "sst";
import { bucket } from "./storage";

const apexDomain = `lapalacios.com`;
// const routerDomain = `*.${apexDomain}`;
const baseUrl = `sst-poc.${apexDomain}`;

const router = new sst.aws.Router("MyRouter", {
  domain: {
    name: baseUrl,
    dns: false,
    cert: "arn:aws:acm:sa-east-1:251724005896:certificate/db573a21-c48e-46d1-8182-c90d2f207bd9",
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
