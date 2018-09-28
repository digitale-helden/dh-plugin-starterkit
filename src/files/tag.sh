#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
V="$1"
M="$2"

GIT=$(which git)
GRUNT=$(which grunt)
GULP=$(which gulp)

if [ $# -lt 1 ]
then
    echo "Usage: $0 (version number as x.x.x)"
    exit 1
fi;

if [ ! -x "$(command -v $GIT)" ];
then
    echo -n "Git client not found please install ... (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)"
    exit 1
fi;

$GIT tag -a v$V -m "Version $V $M"
$GIT push --tags
bash ./version.sh

if [ -x "$(command -v $GRUNT)" ];
then
    $GRUNT dist
else
    if [ -x "$(command -v $GULP)" ];
    then
        $GULP dist
    else
        echo -n "Neither gulp or grunt is installed!"
        exit 1
    fi;
fi;

sleep 5
$GIT commit -a -m "bump $V"
$GIT push