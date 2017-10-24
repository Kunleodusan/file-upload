/**
 * Created by kunle on 10/20/17.
 */

requirejs.config({
    //By default load any module IDs from js/lib
    //baseUrl: 'bower_components',
    paths: {
        jquery: './bower_components/jquery/dist/jquery'

    }
});

// Start the main app logic.
requirejs(['jquery','./js/events'],
    function   ($,domEvent) {
        $(document).ready(function () {

            console.log('new age');

            //drag event
            $(this).on('dragover','#uploadDiv',
                function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            );
            //drop event
            $(this).on('drop',"#uploadDiv",
                function (event) {
                    domEvent.drop(event);
                }
            );
            //click event to delete
            $(document).on('click',"#uploadDiv > .preview > .deleteOption",
                function (e) {
                    domEvent.delete(e.target.id);
                }
            );
            ///file select to add file
            $(document).on('change','#fileInput',
                function (e) {
                    domEvent.change(e);
                }
            );
            //form submit
            $('#uploadForm').submit(
                function (e){
                    e.preventDefault();
                    var item_id=$('#item_id').val();
                    var item_type=$('#item_type').val();
                    domEvent.submitForm(item_id,item_type);
                }
            );
        });
    }
);