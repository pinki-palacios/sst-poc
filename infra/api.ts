import { Resource } from "sst";
import { bucket } from "./storage";

const apexDomain = `lapalacios.com`;
const routerDomain = `*.${apexDomain}`;
const baseUrl = `sst-poc.${apexDomain}`;

const router = new sst.aws.Router("MyRouter", {
  domain:
    $app.stage === "luispalacios"
      ? routerDomain
      : {
          name: routerDomain,
          dns: false,
          cert: "arn:aws:acm:us-east-1:251724005896:certificate/c3a03e95-4424-4915-adad-d73b4bb56a2c",
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
      instance: router,
      domain: baseUrl,
      path: `/api/${$app.stage}`,
    },
  },
  link: [params, bucket],
  handler: "packages/functions/src/api.handler",
});
