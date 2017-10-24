<?php
/**
 * Created by PhpStorm.
 * User: kunle
 * Date: 10/22/17
 * Time: 11:49 PM
 */

namespace Model;


class Document
{
    private $documents=[];
    public $db;
    private $item_id;
    private $item_type;

    function __construct($item_id=0,$item_type='DEFAULT')
    {
        $this->db = new \mysqli('127.0.0.1','root','oladipupo','vc4a');
        $this->item_id=$item_id;
        $this->item_type=$item_type;

        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function insert($files)
    {
        //insert into database.
        if($this->db->query($this->generateQuery($files))!==TRUE){
            throw new \Exception('Error Saving into Database: '.$this->db->error);
        }
        else return 'File(s) saved';
    }

    private function validateData($data)
    {
        //loop through array keys
        //throw exception if nothing is found.
    }

    private function generateQuery($filename)
    {
        //echo $this->db->escape_string($filename);
        return 'INSERT INTO documents (item_id, item_type, filename)'.
            ' VALUES ('.$this->item_id.',\''.$this->item_type.'\',\''.$this->db->escape_string($filename).'\')';
    }

    public function getAll()
    {
        $sql='SELECT * from documents';
        $result = $this->db->query($sql);

        if(gettype($result)=='object' && $result->num_rows>0){
            while ($row = $result->fetch_assoc()){
                array_push($this->documents,$row);
            }
            return $this->documents;
        }

        throw new \Exception('No Documents Found');

    }

    function __destruct()
    {
        // TODO: Implement __destruct() method.
        $this->db->close();
    }
}