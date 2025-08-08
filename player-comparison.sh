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
    elif [ "$1" == "weight" ]; then
      curl -X POST -i localhost:$SERVER_PORT/weight
    elif [ "$1" == "compare" ]; then
      echo "Usage: $ player-comparison compare TEAM1 NUM1 TEAM2 NUM2"
    elif [ "$1" == "getWeights" ]; then
      curl -X GET localhost:$SERVER_PORT/weight
    elif [ "$1" == "predictPlayers" ]; then
      curl -X POST -i localhost:$SERVER_PORT/predictPlayers
    elif [ "$1" == "predictTeams" ]; then
      curl -X POST -i localhost:$SERVER_PORT/predictTeams
    else
        echo "Action: $1 does not exist"
    fi
elif [ $# -eq 5 ]; then
    if [ "$1" == "compare" ]; then
      curl -X GET -i \
      localhost:$SERVER_PORT/compare?player1Team=$2\&player1Number=$3\&player2Team=$4\&player2Number=$5
    fi
else
    echo "Usage: $ player-comparison ACTION ARGS"
fi
