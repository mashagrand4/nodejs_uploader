import '@frontend/scss/style.scss';
import template from '@frontend/previewTemplate.hbs';

let fileList = {};
let filesArr = [];

const isValidFile = fileItem => /\.(jpe?g|png|pdf)$/i.test(fileItem.name) && fileItem.size < 5242880;

const addPreview = (fileItem) => {
  if (isValidFile(fileItem)) {
    const previewBlock = document.querySelector('#previews');
    previewBlock.innerHTML += template({ src: URL.createObjectURL(fileItem) });
  } else {
    alert('Image Size should not be greater than 5Mb and have a extension .jpeg/.png/.pdf');
  }
};

const objToArr = obj => Array.from(obj);

const updateFileList = () => {
  fileList = Object.assign({}, filesArr);
};

const deleteImage = (event) => {
  objToArr(fileList);
  filesArr = filesArr.filter(fileItem => fileItem.name !== event.target.parentNode.dataset.nameImg);
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  updateFileList();
};

window.addEventListener('load', () => {
  document.querySelector('#upload').addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (fileList) {
      for (let i = 0; i < Object.keys(fileList).length; i += 1) {
        formData.append('files', fileList[i]);
      }
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.send(formData);

    fileList = {};
    filesArr = [];
    document.querySelector('#previews').innerHTML = '';
  });

  document.querySelector('#previews').addEventListener('click', (e) => {
    if (fileList) {
      deleteImage(e);
    }
  });

  document.querySelector('#file_add').addEventListener('change', (e) => {
    e.preventDefault();
    if (fileList) {
      [].forEach.call(document.querySelector('input[type=file]').files, addPreview);
    }
    const tmpFileList = objToArr(document.querySelector('input[type=file]').files);
    filesArr = filesArr.concat(tmpFileList);
    updateFileList(filesArr);
  });
});
