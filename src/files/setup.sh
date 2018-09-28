#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PHP=$(which php)

#parse command line arguments
for i in "$@"
do
case $i in
    --php=*)
    PHP="${i#*=}"
    shift # past argument=value
    ;;
    *)
    # unknown option
    ;;
esac
done;

mkdir -p $DIR/wordpress

if [ ! -f "$DIR/wordpress/wp-cli.phar" ]; then
    cd $DIR/wordpress
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x ./wp-cli.phar
else
    cd $DIR/wordpress
    chmod +x ./wp-cli.phar
    $PHP ./wp-cli.phar cli update
fi;

$PHP ./wp-cli.phar core download

echo "Done!"
exit 0;