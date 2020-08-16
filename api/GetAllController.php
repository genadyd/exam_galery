<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 8/9/20
 * Time: 8:16 AM
 */


namespace GetAllController;


use MainController\MainController;
require_once './MainController.php';
class GetAllController extends MainController
{

    public function exeq(){
        return (json_encode($this->getFiles($this->getImgDir() )));
    }

}
