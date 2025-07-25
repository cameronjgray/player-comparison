#!/bin/bash

SET_PORT=8081

if [ $# -eq 1 ]; then
    action=$1
    if [ "$1" == "health" ]; then
      curl -i localhost:$SET_PORT/health
    else
        echo "Action: $1 does not exist"
    fi
else
    echo "Usage: $ player-comparison ACTION"
fi
