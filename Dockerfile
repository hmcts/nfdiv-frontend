# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
COPY --chown=hmcts:hmcts . .

USER root
RUN corepack enable

WORKDIR /opt/app

USER hmcts

# ---- Build image ----
FROM base as build
RUN yarn --version && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true yarn install && yarn build:prod && yarn cache clean

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main
RUN yarn build:ts

EXPOSE 3001
