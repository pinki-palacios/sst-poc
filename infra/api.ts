import { bucket } from "./storage";

const apexDomain = `lapalacios.com`;
const routerDomain = `*.${apexDomain}`;
const baseUrl = `sst-poc.${apexDomain}`;

const router = new sst.aws.Router("MyRouter", {
  domain: routerDomain,
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
