# nfdiv-frontend

- [nfdiv-frontend](#nfdiv-frontend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Running the application](#running-the-application)
    - [Running end-to-end](#running-end-to-end)
    - [Running with Docker](#running-with-docker)
  - [Developing](#developing)
    - [Code style](#code-style)
    - [Running the tests](#running-the-tests)
      - [Unit tests](#unit-tests)
      - [Functional tests](#functional-tests)
      - [Accessibility tests](#accessibility-tests)
      - [Cross browser tests](#cross-browser-tests)
    - [Security](#security)
      - [CSRF prevention](#csrf-prevention)
      - [Helmet](#helmet)
    - [Healthcheck](#healthcheck)
  - [Migrating backend field changes](#migrating-backend-field-changes)
  - [License](#license)

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your  environment:

- [Node.js](https://nodejs.org/) v12.0.0 or later.
- [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com)

### Running the application

Install dependencies by executing the following command:

```bash
yarn install
```

Bundle:

```bash
yarn webpack
```

Start server:

```bash
yarn start
```

The application's home page will be available at [https://localhost:3001](https://localhost:3001)

### Running end-to-end

The application makes calls to
[case orchestration service](https://github.com/hmcts/nfdiv-case-orchestration-service).
Make sure you have this running to run the frontend e2e.

Running the scripts present would require zsh to be installed.

Please see https://www.freecodecamp.org/news/how-to-configure-your-macos-terminal-with-zsh-like-a-pro-c0ab3f3c1156/
if zsh is not installed on your machine. Steps 1 to 3 of the above link should suffice.

### Running with Docker

Create docker image:

```bash
docker-compose build
```

Run the application by executing the following command:

```bash
docker-compose up
```

This will start the frontend container exposing the application's port `3001`.

In order to test if the application is up, you can visit [https://localhost:3001](https://localhost:3001) in your browser.

## Developing

Starting the server in development mode:

```bash
yarn build
DEBUG=axios yarn start:dev
```

### Code style

We use [Prettier](https://prettier.io/) alongside [ESLint](https://github.com/typescript-eslint/typescript-eslint) and [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting with auto fix:

```bash
yarn lint --fix
```

### Running the tests

#### Unit tests

We uses [Jest](https://jestjs.io//) as the test engine. You can run unit tests by executing the following command:

```bash
yarn test
```

#### Functional tests

Running the functional tests:

```bash
TEST_HEADLESS=false yarn test:cucumber
```

Note: By default tests are run heedlessly (i.e. without displaying the browser) setting the `TEST_HEADLESS` flag to `false` will open the test browser window allowing you to see whats happening in realtime.

Running the functional tests against local Docker:

```bash
NODE_ENV=docker yarn test:cucumber
```

Note: Other options can still be used with the above command

Running a single test:

```bash
yarn test:cucumber:grep 'Name of Feature, Scenario, or @tag'
```

Viewing functional test reports locally:

```bash
yarn test:cucumber:reports
```

To view the report from Jenkins, navigate to the build artefacts page scroll to the bottom and click “Download All”.

Then extract it and run:

```bash
npx allure-commandline serve ~/Downloads/archive/functional-output/functional/reports
```

#### Accessibility tests

Running accessibility tests:

```bash
yarn test:a11y
```

By default all of the pages in listed [urls.ts](src/main/steps/urls.ts) will be tested.

#### Cross browser tests

Cross browser tests are run via [CodeceptJS](https://codecept.io/) using the [Playwright](https://playwright.dev/) plugin which tests Chrome/Edge, Safari and Firefox. The [WebDriver](https://www.w3.org/TR/webdriver/) plugin is used to test Edge on Windows via [Sauce Labs](https://saucelabs.com/).

Cross browser tests are automatically run via the nightly Jenkins pipeline.

Running cross browser tests locally, start the server then run:

```bash
# Playwright - Chrome/Edge, Safari and Firefox
TEST_HEADLESS=false yarn test:crossbrowser:playwright
```

To run the cross browser tests using Sauce Labs, install the [Sauce Labs connect proxy tunnel](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy) and set the following environment variables with your own [Sauce Labs](https://saucelabs.com/) account details: `SAUCE_USERNAME`, `SAUCE_ACCESS_KEY`, and `SAUCE_TUNNEL_IDENTIFIER`.

```bash
# WebDriver (via Sauce Labs)
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -x https://eu-central-1.saucelabs.com/rest/v1 -i $SAUCE_TUNNEL_IDENTIFIER -B all
yarn test:crossbrowser:sauce
```

See [`TESTING.md`](TESTING.md) for more information on testing processes.

### Security

#### CSRF prevention

[Cross-Site Request Forgery](https://github.com/pillarjs/understanding-csrf) prevention has already been set up, at the application level. However, you need to make sure that CSRF token is present in every HTML form that requires it. For that purpose you can use the `csrfProtection` macro. Your njk file would include it like this:

```html
{% from "macros/csrf.njk" import csrfProtection %}
<form>{{ csrfProtection(csrfToken) }}</form>
```

#### Helmet

This application uses [Helmet](https://helmetjs.github.io/), which adds various security-related HTTP headers to the responses. Apart from default Helmet functions, following headers are set:

- [Referrer-Policy](https://helmetjs.github.io/docs/referrer-policy/)
- [Content-Security-Policy](https://helmetjs.github.io/docs/csp/)

There is a configuration section related with those headers, where you can specify:

- `referrerPolicy` - value of the `Referrer-Policy` header

Here's an example setup:

```json
"security": {
  "referrerPolicy": "origin",
}
```

Make sure you have those values set correctly for your application.

### Healthcheck

The application exposes a health endpoint [https://localhost:3001/health](https://localhost:3001/health), created with the use of [Nodejs Healthcheck](https://github.com/hmcts/nodejs-healthcheck) library. This endpoint is defined in [health.ts](src/main/routes/health.ts) file. Make sure you adjust it correctly in your application. In particular, remember to replace the sample check with checks specific to your frontend app, e.g. the ones verifying the state of each service it depends on.

## Migrating backend field changes

Once you have created a NFDIV-Case-API Pull Request with the case definition changes, update `CCD_URL` in [values.yaml](charts/nfdiv-frontend/values.yaml) and `services.case.url` in [default.yaml](config/default.yaml) so that the CCD Data Store is pointing at the Preview version deployed as part of your No Fault Divorce Case API pull request.

For example: `CCD_URL: 'http://ccd-data-store-api-nfdiv-case-api-pr-232.service.core-compute-preview.internal'`

Next, run the `generateTypescript` Gradle task in the Case API. Once this has completed, navigate to `build/ts/index.ts` in the Case API and copy the contents of the file. Navigate back to the frontend repository and paste the contents of the file into [definition.ts](src/main/app/case/definition.ts). Depending on how your IDE is configured, the formatting of strings from double to single quotes should be carried out automatically.

Once you have pasted the code into [definition.ts](src/main/app/case/definition.ts) you may notice some compilation errors in [case.ts](src/main/app/case/case.ts), [from-api-format.ts](src/main/app/case/from-api-format.ts) and [to-api-format.ts](src/main/app/case/to-api-format.ts). This is typically caused by either changes to the field name or to the field type. You will need to resolve these compilation errors manually.

You will now be in a position to test your changes either in isolation (`yarn start:dev`) or with Docker (`yarn start:docker`).

One final important point to remember is that the `CCD_URL` in [values.yaml](charts/nfdiv-frontend/values.yaml) and `services.case.url` in [default.yaml](config/default.yaml) will need to be reverted to their original values once migration is complete and before any Pull Requests into `master` are merged.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
