import {templates} from './templates.js';
import utils from './utils.js';
import dataSource from './settings.js';

class BooksList {
  constructor() {
    const thisBooksList = this;

    thisBooksList.filters = [];
    thisBooksList.favoriteBooks = [];
    
    thisBooksList.initData();
    thisBooksList.renderBooksList();
    thisBooksList.getElements();
    thisBooksList.filterBooks();
    thisBooksList.initActions();
    
    thisBooksList.determineRatingBgc();

    
  }

  initData() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
  }

  getElements(element) {
    const thisBooksList = this;
    thisBooksList.element = element;
    thisBooksList.booksList = document.querySelector('.books-list');
    thisBooksList.bookImages = this.booksList.querySelectorAll('.book__image');
    thisBooksList.filterForm = document.querySelector('.filters');
    thisBooksList.bookElements = document.querySelectorAll('.book');
    
  }

  initActions() {
    const thisBooksList = this;

    /* add event listener for every book*/
    for (const bookImage of thisBooksList.bookImages) {
      bookImage.addEventListener('dblclick', function (event) {
        if (event.target.offsetParent.classList.contains('book__image')) {
          event.preventDefault();
          const bookImageId = bookImage.getAttribute('data-id');

          /* check if the book is not in favourites */
          const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookImageId);

          if (indexOfBook === -1) {
          /* add class favourite */
            bookImage.classList.add('favorite');

            /* add favourite book to array */
            thisBooksList.favoriteBooks.push(bookImageId);
            console.log('favorite books:', thisBooksList.favoriteBooks);
          } else {
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            bookImage.classList.remove('favorite');
          }
        }
      });

      thisBooksList.filterForm.addEventListener('change', function (event) {
        const target = event.target;

        if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
          const filterValue = target.value;

          if (!thisBooksList.filters.includes(filterValue)) {
            thisBooksList.filters.push(filterValue);
          }
          else {
            const filterIndex = thisBooksList.filters.indexOf(filterValue);
            if (filterIndex !== -1) {
              thisBooksList.filters.splice(filterIndex, 1);
            }
          }

        }
      });
     
    }
  }

  filterBooks(){
    const thisBooksList = this;
    for (const bookElement of thisBooksList.bookElements) {
      const bookId = parseInt(bookElement.querySelector('.book__image').getAttribute('data-id'));
      const bookData = thisBooksList.data.find(bookItem => bookItem.id === bookId);



      let shouldBeHidden = false; 
      
      const details = bookData.details;

      for (const filter of thisBooksList.filters) {
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
 

  determineRatingBgc(rating) {
    

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

  renderBooksList() {
    const thisBooksList = this;
    thisBooksList.booksList = document.querySelector('.books-list');
    for (let eachElement of thisBooksList.data) {
      eachElement.ratingBgc = thisBooksList.determineRatingBgc(eachElement.rating);
      eachElement.ratingWidth = eachElement.rating * 10;
      const generatedHTML = templates.templateBook(eachElement);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.booksList.appendChild(bookElement);
    }
  }



}


const app = new BooksList();

