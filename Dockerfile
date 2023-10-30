# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:20-alpine as base
COPY --chown=hmcts:hmcts . .
RUN yarn install --ignore-optional --production \
  && yarn cache clean

# ---- Build image ----
FROM base as build
RUN yarn --version && yarn install --ignore-optional && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main
RUN yarn build:ts

EXPOSE 3001
