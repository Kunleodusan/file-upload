/**
 * Created by kunle on 10/24/17.\
 * this is the model body of the application
 */
define(function () {
    var fileArr=[];

    function addItem(file) {
        fileArr.push(file);
    }
    function deleteItem(id){
        fileArr.splice(id,1);
    }
    function getAll() {
        return fileArr;
    }
    return{
        getAll:getAll,
        deleteItem:deleteItem,
        addItem:addItem
    }
});