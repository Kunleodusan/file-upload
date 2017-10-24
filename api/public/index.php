<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../Views/Home.php';
require __DIR__ . '/../Service/DocumentManager.php';
require __DIR__ . '/../Model/Document.php';
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
    $data=$document->getFiles();
    returnResponse($data[0],$data[1]);
}
if($_SERVER['REQUEST_METHOD']==='POST'){
    $data=$document->processRequest();
    returnResponse($data[0],$data[1]);
}
else{
    $data=['Request not understood',500];
}

function returnResponse($data,$status){
    header('Content-Type: application/json',true,$status);
    echo $data;
}