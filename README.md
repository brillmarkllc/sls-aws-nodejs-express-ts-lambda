<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/fahimuddin-brillmark'
authorName: 'Fahim Uddin'
authorAvatar: 'https://ca.slack-edge.com/T4BKSUFED-U03HTF95ABU-1a504cd7f3e0-512',
ownerLink: 'https://www.brillmark.com'
owner: 'Brillmark LLC'
frameworkLink: 'https://github.com/serverless'
frameworkOwner: 'Serverless, Inc.'
-->

# Serverless Framework Node Express API on AWS in TS

This boilerplate project sets up a Serverless Framework application with AWS Lambda and Node.js runtime, allowing you to deploy an Express.js-based API in a serverless environment using Typescript. This setup is highly modular, with functions packaged individually and enhanced with plugins for local development.

Javascript Version: [Serverless Framework Node Express API on AWS in JS](https://github.com/brillmarkllc/sls-aws-nodejs-express-js-lambda/)

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
npm run deploy:dev
```

Under the hood it uses `serverless deploy --stage dev` command to deploy to dev environment

After running deploy, you should see output similar to:

```
Deploying "sls-aws-nodejs-express-ts-lambda" to stage "dev" (us-east-1)

✔ Service deployed to stack sls-aws-nodejs-express-ts-lambda-dev (96s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: sls-aws-nodejs-express-ts-lambda-dev-api (2.3 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in the following response:

```json
{
  "app": "AWS Lambda NodeJS Express TS App",
  "version": "1.0.0"
}
```

### Local development

The easy and quick way to develop and test your function is to use the `serve` command:

```
npm run serve
```

This will start a local server emulates the AWS Lambda function and receive your requests from `http://localhost:3000/`, allowing you to interact with your function locally as if it were running local nodejs server. Under the hood, it uses `serverless offline start` command from Serverless Offline and Watcher Plugin.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

Press `Ctrl+C` to exit from the running server.

### Hybrid development

The better way to develop and test your function is to use the `dev` command:

```
npm run dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud. Under the hood, it uses `serverless dev` command from Serverless Framework.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `npm run deploy:dev` or `npm run deploy:prod` to deploy the function to the cloud depending on your desired environment.

### Key Features

- **Provider**: Uses AWS Lambda to run your Node.js functions in the cloud, with a specified runtime version of Node.js 20.x and regional deployment in `us-east-1`.

- **Environment Variables**: Environment variables like `BASE_URL` are dynamically loaded from your system or `.env` file. You can add any environment variables to the `.env` file and reference them directly in the `environment` section of the `serverless.yml` file, making it easy to manage different environments for development and production.

- **Functions**: The primary Lambda function is defined with a custom memory size and timeout, triggered by HTTP API events, supporting wildcard routes. To learn more about `httpApi` event configuration options, please refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). As the event is configured in a way to accept all incoming requests, the Express.js framework is responsible for routing and handling requests internally.

- **CORS Enabled**: Cross-Origin Resource Sharing is enabled for the API, allowing flexible interactions from different origins.

- **Tags for Resource Tracking**: Custom tags such as `Executer`, `Environment`, `Scope`, `Purpose`, and `Owner` are added to track and manage AWS resources. These tags **must** be added when deploying new resources in AWS, following a team development convention that helps track costs and resource usage over time. This ensures efficient cost allocation and better resource management across different environments.

- **Packaging**: Functions are packaged individually to optimize deployment size and performance.

- **Offline Development**: Utilizes `serverless-offline` for local testing and development, providing an emulated API Gateway environment. Offline development **does not affect any resources deployed in AWS**. You can freely test and develop without impacting the production or development environments.

- **File Watching**: The `serverless-offline-watcher` plugin watches for changes in the `src` folder and reloads functions automatically when changes are detected, making the development cycle faster and smoother.

## handler.ts

This file serves as the entry point for deploying the Express.js application to AWS Lambda using the Serverless Framework.

### Key Details:

- **serverless-http**: The `serverless-http` package is used to wrap the Express.js app and convert it into a Lambda-compatible format. This allows your API to be deployed as a serverless function on AWS Lambda. To learn more about `serverless-http`, please refer to the [serverless-http README](https://github.com/dougmoscrop/serverless-http).

- **Express App Integration**: The Express app, located in `src/app.ts`, is imported and passed to `serverless`, which handles the necessary adaptation to run in a Lambda environment.

- **Lambda Handler**: The `handler` function exported from this file is the entry point for AWS Lambda to execute the Express application, effectively routing requests as it would in a standard Node.js environment.

This setup enables the deployment of a standard Express.js API in a serverless architecture, taking advantage of AWS Lambda's scalability and cost-effectiveness.

## src/app.ts

This file is responsible for initializing the Express.js application and setting up essential middleware, routes, and error handling for the API.

### Key Sections:

- **Express Initialization and Middleware**:
  - The Express app is initialized and configured with several middleware functions:
    - `cors()`: Enables Cross-Origin Resource Sharing to allow requests from different domains.
    - `express.urlencoded()` and `express.json()`: Parses incoming requests with URL-encoded and JSON data respectively, allowing the app to handle forms and JSON payloads.
- **Routing**:

  - Routes are imported from `routes.ts` and attached to the app to handle API requests for various endpoints.

- **Error Handling**:

  - A custom error handler is used to manage errors in a structured way. It is attached after the routes to handle any errors that occur during request handling.

- **Database Connection (Placeholder)**:
  - There is a placeholder for a database connection. The `databaseConnection()` function is commented out but can be enabled and implemented when needed for database integration.

This file defines the main structure and configuration of the Express app, handling routing, middleware, and error handling in a modular and scalable way.

## src/routes.ts

This file defines the main routing logic for the Express.js application. It contains route handlers for different API endpoints and a custom 404 handler for routes that are not found.

### Key Sections:

- **Home Route (`/`)**:

  - This route responds to all HTTP methods (using `router.all()`) and returns basic application information such as the app name and version.

- **Hello Route (`/hello`)**:

  - A simple GET route that returns a message from the path. This is used to demonstrate a basic route response.

- **Sum Route (`/sum`)**:

  - This route calls the `getSum` function from the `core/getSum.ts` module. It handles a GET request and uses a core function to return a calculated sum, showing how core logic can be abstracted from the route handler.

- **POST Request Example (`/add`)**:

  - This POST route accepts two parameters (`a` and `b`) in the request body, calculates their sum, and returns it in the response.
  - The route also includes error handling for missing parameters, returning a 400 status code with a descriptive error message if either parameter is missing.

- **Placeholder for API Routes**:

  - The file includes a placeholder for adding additional API routes, such as authentication (`/api/auth`), which can be modularized in separate files for better organization.

- **404 Error Handler**:
  - A custom 404 handler is used to catch any requests to undefined routes. It responds with a JSON object containing an error message and a helpful description to inform the client that the requested resource could not be found.

This routing file is modular and can easily be extended by adding more routes or integrating external route modules as the application grows.

## src/core/getSum.js

This file contains the core logic for the `getSum` function, which calculates the sum of two numbers and handles the response for the corresponding API route.

### Key Sections:

- **Core Sum Calculation**:

  - The `getSum` function abstracts the logic for summing two numbers. In this example, it calculates the sum of `2` and `5` using the `sum()` utility function from `utils/math.ts`.

- **Custom Error Handling**:

  - If the sum calculation fails, the `getSum` function throws a custom error using the `createError()` function from `error.js`, providing a descriptive error message and a status code (500 in this case).

- **Success Response**:

  - On a successful calculation, the result is wrapped in an object and sent back using the `successResponse()` function from `response.ts`. The response could also be the raw sum if preferred.

- **Error Propagation**:
  - Any errors that occur during the execution of the function are caught and passed to the next middleware (typically the error handler) using `next(error)`.

This core logic is reusable and can be extended to handle more complex calculations or responses, depending on the application's needs.
