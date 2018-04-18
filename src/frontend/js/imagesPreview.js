import '../scss/style.scss';
import template from '../previewTemplate.hbs';
import wrongTemplate from '../modalWindowTemplate.hbs';
import Validator from './services/validator';
import './modal-manager';

const errorsArr = new Validator();
let filesArr = [];

const btn = document.getElementById('myBtn');
const modal = document.getElementById('myModal');

btn.addEventListener('click', () => {
  modal.style.display = 'block';
});

const addToUploadArr = (fileItem) => {
  filesArr.push(fileItem);
};

const isValidFile = (fileItem) => {
  if (
    !Validator.regexp(fileItem.name, /\.(jpe?g|png|pdf)$/i) ||
    !Validator.type(fileItem, ['image/jpeg', 'image/png', 'application/pdf'])
  ) {
    errorsArr.errors.push({
      fileName: fileItem.name,
      error: 'Error type: extension can be only jpeg|png|pdf!',
    });
    return false;
  }
  if (!Validator.range(fileItem.size)) {
    errorsArr.errors.push({
      fileName: fileItem.name,
      error: 'Error size: image should be equal or less then 5mb',
    });
    return false;
  }
  return true;
};

const addPreview = (fileItem) => {
  if (isValidFile(fileItem)) {
    addToUploadArr(fileItem);
    const previewBlock = document.querySelector('#previews');
    previewBlock.innerHTML += template({
      src: URL.createObjectURL(fileItem),
      id: fileItem.name,
    });
  } else {
    const wrongImages = document.querySelector('#wrongImages');
    wrongImages.innerHTML += wrongTemplate({
      src: URL.createObjectURL(fileItem),
      errorMessage: errorsArr.errors[0].error,
    });
    btn.click();
  }
};

const createFileListToUpload = () => Object.assign({}, filesArr);

const deleteImage = (event) => {
  filesArr = filesArr.filter(file => file.name !== event.target.parentNode.dataset.id);
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
};

window.addEventListener('load', () => {
  document.querySelector('#file_add').addEventListener('change', (e) => {
    e.preventDefault();
    [].forEach.call(document.querySelector('input[type=file]').files, addPreview);
  });

  document.querySelector('#previews').addEventListener('click', (e) => {
    deleteImage(e);
  });

  document.querySelector('#upload').addEventListener('click', (e) => {
    e.preventDefault();

    const fileList = createFileListToUpload(filesArr);
    const formData = new FormData();

    if (fileList) {
      for (let i = 0; i < Object.keys(fileList).length; i += 1) {
        formData.append('files', fileList[i]);
      }
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.send(formData);

    filesArr = [];
    document.querySelector('#previews').innerHTML = '';
  });
});
