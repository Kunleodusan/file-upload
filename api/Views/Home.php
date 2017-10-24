<?php
/**
 * Created by PhpStorm.
 * User: kunle
 * Date: 10/20/17
 * Time: 5:21 AM
 */

namespace Views;


class Home
{
    static function getHome(){
        echo 'welcome';
        return 'welcomeHome';
    }
    static function postHome(){
        return 'posted to delta';
    }
    static function getHi(){
        return 'welcome Hi';
    }
}