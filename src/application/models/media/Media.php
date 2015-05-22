<?php

class Media
{



    public static function file_thumb($f)
    {
        $urls = retrieve('media', $f, 'FILE_JSON');
        $urlsdecoded = json_decode($urls);
        $type = $urlsdecoded->type;
        switch ($type):
            case 'image/jpeg':
                return '<a target="_blank" href="' . extract_url($urls) . '"><img src="' . extract_url($urls, 'thumbnail') . '"/></a>';
                break;
            case 'image/png':
                return '<a target="_blank" href="' . extract_url($urls) . '"><img src="' . extract_url($urls, 'thumbnail') . '"/></a>';
                break;
            default:
                return '<a target="_blank" href="' . extract_url($urls) . '"><span class="fileicon ' . get_file_extension($urlsdecoded->name) . '">' . $urlsdecoded->name . '</span></a>';
        endswitch;

    }


    public static function get_file_extension($file_name)
    {
        return substr(strrchr($file_name, '.'), 1);
    }

    /*
     * Returns the id of the media file inserted
     */

    public static function add_media_file($obj,$url)
    {
        global $db;
        $sql = "INSERT INTO media (url,file_json)
                    VALUES (:url, :file_json)";
        $query = $db->prepare($sql);
        try {
            $query->execute(array(
                ':file_json' => $obj,
                ':url' => $url,
            ));
        } catch (PDOException $e) {
        db_exception($e);
        return false;
        }
        $id = $db->lastInsertId();
        $count = $query->rowCount();
        if ($count)
            return $id;
        else
            return 0;
    }

    public static function handle_upload($name)
    {
        if(isset($_FILES[$name]))
        if ($_FILES[$name]['size']) {
            $upload_handler = new UploadHandler(array(
                'param_name' => $name,
                'accept_file_types' => '/\.(gif|jpe?g|png)$/i'
            ));
            if (isset($upload_handler->response[$name][0]->error)) {
                add_error($upload_handler->response[$name][0]->name . ' : ' . $upload_handler->response[$name][0]->error);
                return false;
            } else {
                $media_id = Media::add_media_file(json_encode($upload_handler->response['upload_image'][0]),$upload_handler->response['upload_image'][0]->url);
            }
            return $media_id;
        }
        add_error('Please upload an image');
        return false;


    }


    public static function extract_url($filejson, $size = "url")
    {
        if ($size != "url") {
            $size = $size . "Url";
        }
        //printr($filejson);
        $filejson = json_decode($filejson);
        //printr($filejson);
        return $filejson->$size;
    }


    public static function get_src($id, $size = "")
    {
        $urls = retrieve('media', $id, 'FILE_JSON');
        //printr($urls);
        if ($size != "")
            return self::extract_url($urls, $size);
        else
            return self::extract_url($urls);

    }

}