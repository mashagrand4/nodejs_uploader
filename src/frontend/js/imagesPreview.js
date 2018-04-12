import '../scss/style.scss';
import template from '../previewTemplate.hbs';
import Validator from './Validator';
import './modal-manager';

const errors = new Validator();

let fileList = {};
let filesArr = [];

const btn = document.getElementById('myBtn');
const modal = document.getElementById('myModal');

btn.addEventListener('click', () => {
    modal.style.display = 'block';
});

const isValidFile = (fileItem) => {
  if (!Validator.regexp(fileItem.name, /\.(jpe?g|png|pdf)$/i) || !Validator.type(fileItem, ['image/jpeg', 'image/png', 'application/pdf'])) {
    errors.errors.push({
      fileName: fileItem.name,
      error: 'Error type: extension can be only jpeg|png|pdf!',
    });
    return false;
  }
  if (!Validator.range(fileItem.size)) {
    errors.errors.push({
      fileName: fileItem.name,
      error: 'Error size: image should be equal or less then 5mb',
    });
    return false;
  }
  return true;
};

const addPreview = (fileItem) => {
  if (isValidFile(fileItem)) {
    const previewBlock = document.querySelector('#previews');
    previewBlock.innerHTML += template({ src: URL.createObjectURL(fileItem) });
  } else {
      btn.click();
    alert(errors.errors[0].fileName + errors.errors[0].error);
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
