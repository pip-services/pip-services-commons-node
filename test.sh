#!/bin/bash

COMPONENT=$(grep -m1 name package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE="pipdevs/${COMPONENT}:${VERSION}-test"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

#docker build -f Dockerfile -t "${IMAGE}" --target build .
#docker run -ti --rm "${IMAGE}" "npm test"

export IMAGE
docker-compose -f ./docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test