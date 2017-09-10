#!/bin/bash

COMPONENT=$(grep -m1 name package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

# Define tag
if [ -z "${BUILD_NUMBER}" ]; then
TAG="v${VERSION}"
else
TAG="v${VERSION}.${BUILD_NUMBER}"
fi

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Login to npm
if [ -z "${NPM_USER}" ]; then
npm login
else
# npm login <<!
# $NPM_USER
# $NPM_PASS
# $NPM_EMAIL
# !
npm-cli-login
fi

git tag $TAG
git push --tags

npm publish --tag $TAG

echo "*** Published ${TAG} release ***"