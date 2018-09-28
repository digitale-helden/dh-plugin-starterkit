#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
GIT=$(which git)

if [ ! -x "$(command -v $GIT)" ];
then
    echo -n "Git client not found please install ... (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)"
    exit 1
fi;

PLUGIN='@pluginFileName@.php'
VERSION=$(echo $(git describe --tags) | sed -n 's/.*\([0-9]\.[0-9]\.[0-9]*\).*/\1/p')

sed -i'' -e 's/\(Version\:*\).*$/\1 '$VERSION'/g' $PLUGIN
rm -f $PLUGIN-e