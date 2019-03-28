// Create a class for the element
class ExpandingList extends HTMLUListElement {
  constructor() {
    // Always call super first in constructor
    super();

    window.onload = function() {
      const uls = Array.from(document.querySelectorAll(':root ul')); //coge todos los ul y los mete en un array
      const lis = Array.from(document.querySelectorAll(':root li'));

      uls.slice(1).forEach(ul => { // recorre todos los ul del array excepto el primero
        ul.style.display = 'none';
      });

      lis.forEach(li => { //recorre todos los li
        const childText = li.childNodes[0]; //coge el texto
        const newSpan = document.createElement('span'); //crea un span newSpan

        newSpan.textContent = childText.textContent; //mete el texto en el span newSpan
        childText.parentNode.insertBefore(newSpan, childText); //inserta newSpan antes de childText
        childText.parentNode.removeChild(childText); //elimina childText
      });

      const spans = Array.from(document.querySelectorAll(':root span')); //mete todos los spans en un array

      spans.forEach(span => {
        if (span.nextElementSibling) {
          span.style.cursor = 'pointer';
          span.parentNode.setAttribute('class', 'closed');
          span.onclick = showul;
        }
      });

      function showul(e) {
        const nextul = e.target.nextElementSibling;

        if (nextul.style.display == 'block') {
          nextul.style.display = 'none';
          nextul.parentNode.setAttribute('class', 'closed');
        } else {
          nextul.style.display = 'block';
          nextul.parentNode.setAttribute('class', 'open');
        }
      }
    };
  }
}

// Define the new element
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
