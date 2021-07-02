# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:12-alpine as base
COPY --chown=hmcts:hmcts . .
RUN HUSKY=0 yarn install --production --ignore-scripts \
  && yarn cache clean

# ---- Build image ----
FROM base as build
RUN HUSKY=0 PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install --ignore-scripts && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main

EXPOSE 3001
