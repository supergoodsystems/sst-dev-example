import { ApiHandler } from "sst/node/api";
import { Config } from "sst/node/config";
import withSupergood from './supergood';

export const handler = withSupergood(ApiHandler(async (_evt) => {
  const response = await fetch('http://ip-api.com/json');
  const data = await response.json() as { query: string };
  const ipAddress = data.query;
  return {
    statusCode: 200,
    body: `Hello world. The IP of this machine is ${ipAddress}`,
  };
}));
