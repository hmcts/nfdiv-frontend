#!/bin/bash
# Clear browser cache and install browsers for testing
set -e
rm -rf ~/.cache/ms-playwright
export PLAYWRIGHT_BROWSERS_PATH=0
yarn test:setup:install-browsers
