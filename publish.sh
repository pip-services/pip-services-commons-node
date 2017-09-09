#!/bin/bash

COMPONENT=`basename "$PWD"`
VERSION=`cat ./VERSION`

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e

#npm login
#git tag "v${VERSION}"
git push --tags

npm publish