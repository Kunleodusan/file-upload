/**
 * Created by kunle on 10/21/17.
 */


var fileArr=[];
var url='http://localhost/vc4a/file-upload/api/public/index.php';
var $uploadDiv=$('#uploadDiv');
var $name=$('#name');

//DRAG over div
function drag_over(event){
    event.preventDefault();
    event.stopPropagation();
}

//drop on div
function drop(event){
    event.preventDefault();
    event.stopPropagation();
    var dt=event.originalEvent.dataTransfer;
    for(var i=0;i<dt.files.length;i++){
        fileArr.push(dt.files[i]);
    }
    previewFiles();
}

$(document).on('dragover','#uploadDiv',function (e) {
    drag_over(e);
});

$(document).on('drop','#uploadDiv',function (e) {
    drop(e);
});

function previewFiles() {
    //empty dom html
    $uploadDiv.html('');
    //check Length
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

$(document).on('click',"#uploadDiv > .preview > .deleteOption",
    function (e) {
        fileArr.splice(e.target.id,1);
        previewFiles();
    }
);

$('#fileInput').change(
    function (e) {
        for(var i=0;i<e.target.files.length;i++){
            fileArr.push(e.target.files[i]);
        }
        previewFiles();
    }
);

//form submit
$('#uploadForm').submit(
    function (e){
        e.preventDefault();
        if(fileArr.length<1){
            $name.text('Kindly Add Files to upload').toggleClass('text-danger');
            return false;
        }

        $name.text('Uploading Files').toggleClass('text-success');
        var data=new FormData();
        data.append('item_id',$('#item_id').val());
        data.append('item_type',$('#item_type').val());
        var totalSize=0;
        for(var i=0;i<fileArr.length;i++){
            data.append('documents[]',fileArr[i]);
            totalSize=totalSize+fileArr[i].size;
        }

        var request=new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);
                $('#name').text(JSON.parse(request.responseText).message);
            }
            if (request.readyState == 4 && request.status == 400) {
                console.log(request.responseText);
                $('#name').text(JSON.parse(request.responseText).message);
                $name.toggleClass('text-success');
                $name.toggleClass('text-danger');
            }
        };
        request.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                $('.progress-bar').width(percentage+'%');
            }
        }, false);
        request.send(data);
    }
);