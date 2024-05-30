import { StackContext, Api, EventBus, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });


  const SUPERGOOD_CLIENT_ID = new Config.Secret(stack, 'SUPERGOOD_CLIENT_ID')
  const SUPERGOOD_CLIENT_SECRET = new Config.Secret(stack, 'SUPERGOOD_CLIENT_SECRET')

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          SUPERGOOD_LOG_LEVEL: 'debug'
        },
        bind: [bus, SUPERGOOD_CLIENT_ID, SUPERGOOD_CLIENT_SECRET],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });


}
