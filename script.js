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
    eachElement.ratingBgc = determineRatingBgc(eachElement.rating);
    eachElement.ratingWidth = eachElement.rating * 10;
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

      if (!filters.includes(filterValue)) {
        filters.push(filterValue);
      }
      else {
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
  const bookElements = document.querySelectorAll('.book');

  for (const bookElement of bookElements) {
    const bookId = parseInt(bookElement.querySelector('.book__image').getAttribute('data-id'));
    const bookData = dataSource.books.find(bookItem => bookItem.id === bookId);

    let shouldBeHidden = false; 
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


function determineRatingBgc(rating){
  if(rating < 6){
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if(rating > 6 && rating <= 8){
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if(rating > 8 && rating <= 9){
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if(rating > 9){
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }


}