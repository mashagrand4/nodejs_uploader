import '../scss/style.scss';
import template from '../templates/previewTemplate.hbs';
import wrongTemplate from '../templates/errorWindowTemplate.hbs';
import Validator from './services/validator';
import errorBlock from './error-window';

const errorsArr = new Validator();
let filesArr = [];

const addToUploadArr = (fileItem) => {
  filesArr.push(fileItem);
};

const isValidFile = (fileItem) => {
  if (
    !Validator.regexp(fileItem.name, /\.(jpe?g|png|pdf)$/i) ||
    !Validator.type(fileItem.type, ['image/jpeg', 'image/png', 'application/pdf'])
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
    errorBlock.innerHTML += wrongTemplate({
      fileName: fileItem.name,
      errorMessage: errorsArr.errors.filter(error => error.fileName === fileItem.name),
    });
  }
};

const deleteImage = (event) => {
  filesArr = filesArr.filter(file => file.name !== event.target.parentNode.dataset.id);
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
};

window.addEventListener('load', () => {
  document.querySelector('#file_add').addEventListener('change', (e) => {
    e.preventDefault();
    [].forEach.call(document.querySelector('input[type=file]').files, addPreview);
    errorsArr.clear();
  });

  document.querySelector('#previews').addEventListener('click', (e) => {
    deleteImage(e);
  });

  document.querySelector('#upload').addEventListener('click', (e) => {
    e.preventDefault();

    if (filesArr.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < filesArr.length; i += 1) {
        formData.append('files', filesArr[i]);
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.send(formData);

      filesArr = [];
      document.querySelector('#previews').innerHTML = '';
    } else {
      const warning = document.getElementById('warning');
      warning.innerHTML = '<p class="warning">You need add at least one image! :)</p>';
      setTimeout(() => {
        warning.innerHTML = '';
      }, 2000);
    }
  });
});
