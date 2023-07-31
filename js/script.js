'use strict';

const select = {
  templateOf: {
    templateBook: '#template-book',
  },
};

/* Templates */
const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
};

/* Generate HTML for books-list */
function renderBooksList() {
  const booksList = document.querySelector('.books-list');

  for (let eachElement of dataSource.books) {
    const generatedHTML = templates.templateBook(eachElement);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookElement);
  }
}

renderBooksList();
initActions();

/* Add books to favouriteBooks */
const favoriteBooks = [];
const filters = [];

function initActions() {
  const bookImages = document.querySelectorAll('.books-list .book__image');

  /* add event listener for every book*/
  for (const bookImage of bookImages) {
    bookImage.addEventListener('dblclick', function (event) {
      if (event.target.offsetParent.classList.contains('book__image')) {
        event.preventDefault();
        const bookImageId = bookImage.getAttribute('data-id');

        /* check if the book is not in favourites */
        const indexOfBook = favoriteBooks.indexOf(bookImageId);

        if (indexOfBook === -1) {
          /* add class favourite */
          bookImage.classList.add('favorite');

          /* add favourite book to array */
          favoriteBooks.push(bookImageId);
          console.log('favorite books:', favoriteBooks);
        } else {
          favoriteBooks.splice(indexOfBook, 1);
          bookImage.classList.remove('favorite');
        }
      }
    });
  }

  const filterForm = document.querySelector('.filters');

  filterForm.addEventListener('change', function (event) {
  const target = event.target;

  if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
    const filterValue = target.value;

    if (target.checked) {
      if (!filters.includes(filterValue)) {
        filters.push(filterValue);
      }
    } else if (!target.checked){
      const filterIndex = filters.indexOf(filterValue);
      if (filterIndex !== -1) {
        filters.splice(filterIndex, 1);
      }
    }

    filterBooks();
    console.log('selected filters:', filters);
  }
});

}


  function filterBooks() {
  const bookElements = document.querySelectorAll('.books');

  for (const bookElement of bookElements) {
    const bookId = parseInt(bookElement.getAttribute('data-id'));
    const bookData = dataSource.books.find(bookItem => bookItem.id === bookId);

    let shouldBeHidden = false; // Reset for each book
    const details = bookData.details;

    for (const filter of filters) {
      if (!details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    if (shouldBeHidden) {
      bookElement.querySelector('.book__image[data-id="' + bookId + '"]').classList.add('hidden');
    } else {
      bookElement.querySelector('.book__image[data-id="' + bookId + '"]').classList.remove('hidden');
    }
  }

}