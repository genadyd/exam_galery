<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers");
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 8/9/20
 * Time: 8:12 AM
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(preg_match('/\/get-all$/', $_SERVER['REQUEST_URI'])){
    require './GetAllController.php';
   $obj = new \GetAllController\GetAllController();
}elseif (preg_match('/\/get-html$/', $_SERVER['REQUEST_URI'])){
    require './GetHtmlController.php';
    $data = json_decode(file_get_contents("php://input") ,true);
    $obj = new \GetHtmlController\GetHtmlController($data['names']);
}
echo ($obj->exeq());
