<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 8/9/20
 * Time: 8:18 AM
 */


namespace GetHtmlController;


use MainController\MainController;
require_once './MainController.php';

class GetHtmlController extends MainController
{
    public function __construct(array $names)
    {
        $this->names =$names;
    }

    private function htmf_build(array $all_files)
    {
        $html = '';
        $html .= '<thead><tr>
             <th>שם הקובץ</th>
             <th>גודל</th>
             <th>סיומת</th>
             <th>תמונה משמשת בגלריה זו</th>
             <th>תקין</th>
             </tr></thead>
             <tbody>';
        foreach ($all_files as $file) {
            $valid = $file['file_size_mb']>10?'התמונה יותר מ 10 מגה':'תמונה עברה ולידציה';
            $use_in_galery = in_array($file['file_name'],$this->names)?'כן':'לא';
            $html .= '<tr class="t_row">
            <td class="file_name">'.$file['file_name'].'</td>
            <td>'.$file['file_size_mb']. 'MB'.'</td>
            <td>'.$file['file_ext'].'</td>
            <td class="use">'.$use_in_galery.'</td>
            <td>'.$valid.'</td>
            </tr>';


        }
        $html .= '</tbody>';
        return $html;
    }



    public function exeq()
    {
       $all_files = $this->getFiles($this->getImgDir());
       return $this->htmf_build($all_files);
    }
}
