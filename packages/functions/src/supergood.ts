import { Context, APIGatewayEvent } from 'aws-lambda';
import { Config } from "sst/node/config";
import Supergood from 'supergood';

export default function handler(lambda: Function) {
    return async function(event: APIGatewayEvent, context: Context) {
        Supergood.init({
            clientId: Config.SUPERGOOD_CLIENT_ID,
            clientSecret: Config.SUPERGOOD_CLIENT_SECRET,
            config: {
                useRemoteConfig: false,
            }
        })
        const result = await lambda(event, context);
        await Supergood.close();
        return result;
    }
}
