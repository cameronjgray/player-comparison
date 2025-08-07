#!/bin/bash

set -a
source .env
set +a

if [ $# -eq 1 ]; then
    action=$1
    if [ "$1" == "health" ]; then
      curl -i localhost:$SERVER_PORT/health
    elif [ "$1" == "sync" ]; then
      curl -X POST -i localhost:$SERVER_PORT/sync
    elif [ "$1" == "calc" ]; then
      curl -X GET -i localhost:$SERVER_PORT/calc
    elif [ "$1" == "weight" ]; then
      curl -X POST -i localhost:$SERVER_PORT/weight
    elif [ "$1" == "getWeights" ]; then
      curl -X GET -i localhost:$SERVER_PORT/weight
    elif [ "$1" == "predict" ]; then
      curl -X POST -i localhost:$SERVER_PORT/predict
    else
        echo "Action: $1 does not exist"
    fi
else
    echo "Usage: $ player-comparison ACTION"
fi
