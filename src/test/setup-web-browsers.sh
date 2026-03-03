#!/bin/bash
# Clear browser cache and install browsers for testing
set -e
rm -rf ~/.cache/ms-playwright
yarn install
yarn test:setup:install-browsers
