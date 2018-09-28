<?php
/*
Plugin Name: @pluginName@
Plugin URI: @pluginUri@
Description: @pluginDescription@
Author: @pluginAuthor@
Author URI: @pluginAuthorUri@
Text Domain: @pluginTextDomain@
Version: 0.0.0
*/

if(!defined('DH_PLUGIN_DOMAIN'))
{
    define('DH_PLUGIN_DOMAIN', '@pluginTextDomain@');
}

if(!function_exists('@pluginFileName@'))
{
    function @pluginFileName@()
    {
    }
}
@pluginFileName@();