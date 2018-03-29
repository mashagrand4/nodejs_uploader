let fileList = {};
let files_arr = [];

let readAndPreview = (fileItem) => {
    if ( /\.(jpe?g|png|pdf)$/i.test(fileItem.name) && fileItem.size < 5242880){
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            let preview_block = document.querySelector('#previews');
            let div = document.createElement('div');
            div.classList.add("img-wrap");
            div.dataset.nameImg = fileItem.name;
            let a = document.createElement('a');
            a.classList.add("btn-del");
            a.innerHTML = 'x';
            div.append(a);
            let image = new Image();
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

let delPrev = event => {
    objToArr(fileList);
    files_arr = files_arr.filter( fileItem => {
        return fileItem.name !== event.target.parentNode.dataset.nameImg;
    });
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    updateFileList();
};

let updateFileList = () => {
    fileList = Object.assign({}, files_arr);
};

let objToArr = obj => {
    return Array.from(obj);
};

window.onload = () => {
    document.querySelector('#upload').addEventListener('click', function (e) {
        e.preventDefault();
        let formData = new FormData();

        if (fileList) {
            for (let i = 0; i < Object.keys(fileList).length; i++) {
                formData.append("files", fileList[i]);
            }
        }

        $.ajax({
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: data => {
                alert("DONE");

                fileList = {};
                files_arr = [];
                document.querySelector('#previews').innerHTML = '';
            },
            error: data => {
                alert("ERROR - " + data.responseText);
            }
        });
    });

    document.querySelector('#previews').addEventListener('click', e => {
        if (fileList){
            delPrev(e);
        }
    });

    document.querySelector('#file_add').addEventListener('change' , e => {
        e.preventDefault();
        if (fileList) {
            [].forEach.call(document.querySelector('input[type=file]').files, readAndPreview);
        }
        let tmp_fileList = objToArr(document.querySelector('input[type=file]').files);
        files_arr = files_arr.concat(tmp_fileList);
        updateFileList(files_arr);
    });

};
