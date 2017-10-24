/**
 * Created by kunle on 10/24/17.
 */
define(['./preview','./model'],function (previewService,model) {

    var url='http://localhost/vc4a/file-upload/api/public/index.php';
    //delete action
    function deleteFile(id) {
            model.deleteItem(id);
            previewService.previewFiles();
    }

    //drop action
    function drop(event){
        event.preventDefault();
        event.stopPropagation();
        var dt=event.originalEvent.dataTransfer;
        for(var i=0;i<dt.files.length;i++){
            model.addItem(dt.files[i]);
        }
        previewService.previewFiles();
    }
    //change of form input
    function inputChange(e) {
            for(var i=0;i<e.target.files.length;i++){
                model.addItem(e.target.files[i]);
            }
            previewService.previewFiles();
    }

    //submit form
    function submitForm(item_id,item_type) {
        var fileArr=model.getAll();
        if(fileArr.length<1){
            previewService.message('danger','Kindly Add Files to upload');
            return false;
        }

        previewService.message('success','Uploading Files');

        var data=new FormData();
        data.append('item_id',item_id);
        data.append('item_type',item_type);

        var totalSize=0;
        for(var i=0;i<fileArr.length;i++){
            data.append('documents[]',fileArr[i]);
            totalSize=totalSize+fileArr[i].size;
        }

        var request=new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                previewService.message('success',JSON.parse(request.responseText).message);
            }
            if (request.readyState == 4 && request.status == 400) {
                previewService.message('danger',JSON.parse(request.responseText).message);
            }
        };
        request.upload.addEventListener("progress", function(e) {
            console.log(e);
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                previewService.showProgress(percentage);
            }
        }, false);
        request.send(data);
    }
    return{
        delete:deleteFile,
        drop:drop,
        change:inputChange,
        submitForm:submitForm
    }

});