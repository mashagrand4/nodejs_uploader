const errorBlock = document.querySelector('#errors-block');

window.addEventListener('load', () => {
  errorBlock.addEventListener('click', (event) => {
    event.preventDefault();

    errorBlock.removeChild(event.target.parentNode.parentNode);
  });
});

export default errorBlock;
