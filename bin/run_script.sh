#!/bin/bash

BIN_DIR=$(dirname "${BASH_SOURCE[0]}")

if [ "$NODE_ENV" == "production" ]; then
  yarn node $BIN_DIR/../scripts/$1.js
else
  yarn ts-node -r dotenv/config $BIN_DIR/../scripts/$1.ts
fi
