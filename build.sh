#!/bin/bash

#COMPONENT=`node -e "console.log(require('./package.json').name);"`
COMPONENT=`basename "$PWD"`
#VERSION=`node -e "console.log(require('./package.json').version);"`
#VERSION=`npm view ${COMPONENT} version`
VERSION=`cat ./VERSION`
IMAGE="pipdevs/${COMPONENT}:${VERSION}-build"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Remove build files
rm -rf ./obj

# Build docker image
docker build -f Dockerfile -t ${IMAGE} --target build .

# Create and copy compiled files, then destroy
#docker create --name ${CONTAINER} ${IMAGE}
docker run -ti --name ${CONTAINER} ${IMAGE} npm run test-tc
docker cp ${CONTAINER}:/app/obj ./obj
docker rm ${CONTAINER}