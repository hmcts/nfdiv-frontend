# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:20-alpine AS base
USER root
RUN corepack enable
COPY --chown=hmcts:hmcts . .
USER hmcts
# ---- Build image ----
FROM base AS build
RUN yarn --version && yarn install
RUN yarn build:prod

# ---- Runtime image ----
FROM build AS runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main
RUN yarn build:ts

USER hmcts
EXPOSE 3001
