#!/bin/bash

COMPONENT=`basename "$PWD"`
VERSION=`cat ./VERSION`
IMAGE="pipdevs/${COMPONENT}:${VERSION}-build"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

#docker build -f Dockerfile -t "${IMAGE}" --target build .
#docker run -ti --rm "${IMAGE}" "npm test"

docker-compose -f ./docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test