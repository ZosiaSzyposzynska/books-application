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

    console.log(booksList);
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

  filterForm.addEventListener('click', function (event) {
    const target = event.target;

    if (target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {
      const filterValue = target.value;

      if (target.checked) {
        const filterIndex = filters.indexOf(filterValue);

        if (filterIndex === -1) {
          filters.push(filterValue);
        } else {
          filters.splice(filterIndex, 1);
        }
        filterBooks();

        console.log('selected filters:', filters);
      }
    }
  });
}

function filterBooks() {
  const books = document.querySelectorAll('.books-list .book__image');
  for (const book of books) {
    const bookId = book.getAttribute('data-id');
   
    let shouldBeHidden = false;
    const details = bookId.details;

    for (const filter of filters) {
      if (!details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    if (shouldBeHidden) {
      book.querySelector('.book__image[data-id="' + bookId + '"]').classList.add('hidden');

    } else {
      book.querySelector('.book__image[data-id="' + bookId + '"]').classList.remove('hidden');

    }
  }
}
