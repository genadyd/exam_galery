<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 8/9/20
 * Time: 8:18 AM
 */


namespace MainController;


abstract class MainController
{
  protected function getImgDir(){
      $dir_url = './img';
      $files_arr = scandir($dir_url);
      return $files_arr;
}
    protected function getFiles(array $dir, array $url_array=array()){
        $new_arr = array();
        foreach($dir as $file){
            if(is_file('./img/'.$file)){
                $file_arr =array(
                    'file_name'=> pathinfo($file, PATHINFO_FILENAME),
                    'file_ext'=> pathinfo($file, PATHINFO_EXTENSION),
                    'file_url'=>'/api/img/'.pathinfo($file, PATHINFO_BASENAME),
                    'file_size_mb'=>number_format((filesize('./img/'.$file)/1048576 ), 2),
                    'file_size_kb'=>number_format((filesize('./img/'.$file)/1024 ), 2),
                    'selected'=>0
                );
                $new_arr[] = $file_arr;
            }
        }
        return $new_arr;


    }

  public abstract function exeq();

}
