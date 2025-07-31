#!/bin/bash

set -a
source .env
set +a

echo $SERVER_PORT

if [ $# -eq 1 ]; then
    action=$1
    if [ "$1" == "health" ]; then
      curl -i localhost:$SERVER_PORT/health
    elif [ "$1" == "sync" ]; then
      curl -i localhost:$SERVER_PORT/sync
    else
        echo "Action: $1 does not exist"
    fi
else
    echo "Usage: $ player-comparison ACTION"
fi
