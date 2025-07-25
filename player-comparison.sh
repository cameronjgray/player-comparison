#!/bin/bash

set -a
source .env
set +a

echo $SERVER_PORT

if [ $# -eq 1 ]; then
    action=$1
    if [ "$1" == "health" ]; then
      curl -i localhost:$SERVER_PORT/health
    elif [ "$1" == "db" ]; then
      curl -i localhost:$SERVER_PORT/db-example
    else
        echo "Action: $1 does not exist"
    fi
else
    echo "Usage: $ player-comparison ACTION"
fi
