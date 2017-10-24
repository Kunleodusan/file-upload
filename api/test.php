<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/Views/Home.php';
require __DIR__ . '/Service/DocumentManager.php';
//use Views\Home;
use Service\DocumentManager;
/**
 * Created by PhpStorm.
 * User: kunle
 * Date: 10/20/17
 * Time: 5:03 AM
 */
$document=new DocumentManager();
//header('Content-Type: application/json',true,400);
if($_SERVER['REQUEST_METHOD']==='GET'){
    echo '{"message":"Hello world"}';
}
if($_SERVER['REQUEST_METHOD']==='POST'){
    $data=$document->processRequest();
    returnResponse($data[0],$data[1]);
}

function returnResponse($data,$status){
    header('Content-Type: application/json',true,$status);
    echo $data;
}