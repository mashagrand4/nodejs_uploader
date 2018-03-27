var fileList = {};
var files_arr = [];

var readAndPreview = function (fileItem) {
    if ( /\.(jpe?g|png|pdf)$/i.test(fileItem.name) && fileItem.size < 5242880){
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            var preview_block = document.querySelector('#previews');
            var div = document.createElement('div');
            div.classList.add("img-wrap");
            div.dataset.nameImg = fileItem.name;
            var a = document.createElement('a');
            a.classList.add("btn-del");
            a.innerHTML = 'x';
            div.append(a);
            var image = new Image();
            image.height = 100;
            image.title = fileItem.name;
            image.src = this.result;
            div.appendChild(image);
            preview_block.append(div);
        }, false);
        reader.readAsDataURL(fileItem);
    }
    else {
        alert("Image Size should not be greater than 5Mb and have a extension .jpeg/.png/.pdf");
    }
};

var delPrev = function (event) {
    objToArr(fileList);
    files_arr = files_arr.filter(fileItem => fileItem.name !== event.target.parentNode.dataset.nameImg);
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    updateFileList();
};

var updateFileList = function () {
    fileList = Object.assign({}, files_arr);
};

var objToArr = function(obj) {
    return Array.from(obj);
};

window.onload = function () {

    document.querySelector('#upload').addEventListener('click', function (e) {
        e.preventDefault();
        var formData = new FormData();

        if (fileList) {
            for (var i = 0; i < Object.keys(fileList).length; i++) {
                formData.append("files", fileList[i]);
            }
        }

        console.log(formData.getAll('files'));

        $.ajax({
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                alert("DONE");

                fileList = {};
                files_arr = [];

                document.querySelector('#previews').innerHTML = '';

            },
            error: function (data) {
                alert("ERROR - " + data.responseText);
            }
        });
    });

    document.querySelector('#previews').addEventListener('click', function (e) {
        if (fileList){
            delPrev(e);
        }
    });

    document.querySelector('#file_add').addEventListener('change' , function(e){
        e.preventDefault();
        if (fileList) {
            [].forEach.call(document.querySelector('input[type=file]').files, readAndPreview);
        }
        var tmp_fileList = objToArr(document.querySelector('input[type=file]').files);
        files_arr = files_arr.concat(tmp_fileList);
        updateFileList(files_arr);
    });

};
