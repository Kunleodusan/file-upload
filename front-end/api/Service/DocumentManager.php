<?php

/**
 * Created by PhpStorm.
 * User: kunle
 * Date: 10/20/17
 * Time: 5:44 AM
 *
 * process:
 * validate request.
 * save chunk
 * check chunkCount.
 * merge chunks
 * update table
 */


namespace Service;
use Model\Document;

class DocumentManager
{
    /*
     * Method to upload file chunk.
     *
     * */
    private function assetFolder($documentName){
        return __DIR__.'/../public/documents/'.$documentName;
    }

    private function message($msg)
    {
        return [
            'message'=>$msg
        ];
    }

    public function processRequest()
    {
        //validate request.
        try{
            $this->validateRequest();
        }catch (\Exception $e){
            return [json_encode($this->message($e->getMessage())),400];

        }
        //parse files into individual objects
        $files=$this->parseFile($_FILES['documents']);

        //save files
        //return [json_encode($files),200];
        $this->saveFiles($files);
        //todo add files to db.

        try{
            $message=$this->saveToDB($_FILES['documents']['name']);
        }catch (\Exception $e){
            return [json_encode($this->message($e->getMessage())),400];
        }

        return [json_encode($this->message($message)),200];

    }

    private function validateRequest(){
        if(!isset($_POST['item_id'])){
            throw new \Exception('Item id is required');
        }
        if(!isset($_POST['item_type'])){
            throw new \Exception('Item type is required');
        }
        if(!isset($_FILES['documents'])){
            throw new \Exception('Kindly attach files to upload');
        }
    }

    private function parseFile($documents)
    {
        $documentsArr=[];

        for ($i=0;$i<count($documents['name']);$i++){
            $selectedDocument=[
                'name'=>$documents['name'][$i],
                'type'=>$documents['type'][$i],
                'tmp_name'=>$documents['tmp_name'][$i],
                'error'=>$documents['error'][$i],
                'size'=>$documents['size'][$i],
            ];
            array_push($documentsArr,$selectedDocument);
        }

        return $documentsArr;
    }

    private function saveFiles($documents){

        for($i=0;$i<count($documents);$i++){
            move_uploaded_file($documents[$i]['tmp_name'],$this->assetFolder($documents[$i]["name"]));
        }
    }

    private function saveToDB($files)
    {
        $response='';

        //create a document Model Object.
        $documents=new Document($_POST['item_id'],$_POST['item_type']);
        //return count($files);
        //loop through file names & save in DB.
        for ($i=0;$i<count($files);$i++){
            try{
                $response=$documents->insert($files[$i]);
            }
            catch (\Exception $e){
                throw new \Exception($e->getMessage());
            }
        }
        return $response;
    }

    public function getFiles()
    {
        $dbDocs=new Document();
        try{
            return [json_encode($dbDocs->getAll()),200];
        }catch (\Exception $e){
            return [json_encode($this->message($e->getMessage())),400];
        }
    }

}