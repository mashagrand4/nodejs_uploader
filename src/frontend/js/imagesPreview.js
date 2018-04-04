import '../css/style.css';
import '../css/form.css';

let fileList = {};
let filesArr = [];

const readAndPreview = (fileItem) => {
  if (/\.(jpe?g|png|pdf)$/i.test(fileItem.name) && fileItem.size < 5242880) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const previewBlock = document.querySelector('#previews');
      const div = document.createElement('div');
      div.classList.add('img-wrap');
      div.dataset.nameImg = fileItem.name;
      const a = document.createElement('a');
      a.classList.add('btn-del');
      a.innerHTML = 'x';
      div.append(a);
      const image = new Image();
      image.height = 100;
      image.title = fileItem.name;
      image.src = this.result;
      div.appendChild(image);
      previewBlock.append(div);
    }, false);
    reader.readAsDataURL(fileItem);
  } else {
    alert('Image Size should not be greater than 5Mb and have a extension .jpeg/.png/.pdf');
  }
};

const objToArr = obj => Array.from(obj);

const updateFileList = () => {
  fileList = Object.assign({}, filesArr);
};

const delPrev = (event) => {
  objToArr(fileList);
  filesArr = filesArr.filter(fileItem => fileItem.name !== event.target.parentNode.dataset.nameImg);
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  updateFileList();
};

window.onload = () => {
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
      delPrev(e);
    }
  });

  document.querySelector('#file_add').addEventListener('change', (e) => {
    e.preventDefault();
    if (fileList) {
      [].forEach.call(document.querySelector('input[type=file]').files, readAndPreview);
    }
    const tmpFileList = objToArr(document.querySelector('input[type=file]').files);
    filesArr = filesArr.concat(tmpFileList);
    updateFileList(filesArr);
  });
};
