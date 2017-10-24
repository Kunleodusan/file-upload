/**
 * Created by kunle on 10/24/17.
 */
define(['jquery','./model'],function ($,model) {

    var $uploadDiv=$('#uploadDiv');
    var $name=$('#name');

    function previewFiles() {
        //empty dom html
        $uploadDiv.html('');
        //check Length
        var fileArr=model.getAll();
        if(fileArr.length>0){
            //append uploaded files to selected list.
            for(var i=0;i<fileArr.length;i++){
                $uploadDiv.append(generatePreview(fileArr[i],i));
            }
        }
        else $uploadDiv.append(defaultPreview());
    }
    function defaultPreview() {
        return '<h3 class="text-center">Drag Files Here</h3>'+
            '<h3 class="text-center">Or</h3>'+
            '<label class="text-center center-block underline" for="fileInput">'+
            'Select Files to Upload.</label>';
    }

    //generate preview image for selected fileList
    function generatePreview(file,id) {
        return "<div class='preview'>" +
            "<span class='text-danger deleteOption text-right' id="+id+">X</span>"+
            "<img src='document.png' id="+id+"/>"+
            "<div class='text-center'>"+file.name+"</div>"+
            "</div>"
    }

    function message($type,$message) {

        $name.text($message).attr('class','text-'+$type);
    }
    function showProgress(percentage) {
        $('.progress-bar').width(percentage+'%');
    }
    return{
        previewFiles:previewFiles,
        message:message,
        showProgress:showProgress
    }
});