{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    bookItem: {
      clickable: '.books-list .book__image',
      image: '.book__image',
    },
  };

  const classNames = {
    classFavorite: 'favorite',
    classHidden: 'hidden',
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];

  const render = function(){
    for(let book in dataSource.books){

      const bookData = dataSource.books[book];

      const ratingBgc = determineRatingBgc(bookData.rating);
      bookData.ratingBgc = ratingBgc;

      const ratingWidth = bookData.rating * 10;
      bookData.ratingWidth = ratingWidth;

      const generatedHTML = templates.bookItem(bookData);
      const booksDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.containerOf.books);
      booksList.appendChild(booksDOM);
    }
  };

  const initActions = function(){
    const bookList = document.querySelector(select.containerOf.books);

    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const book = event.target.offsetParent;

      if(book.classList.contains('book__image')){
        const bookId = book.getAttribute('data-id');

        if(!book.classList.contains('favorite')){
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove(classNames.classFavorite);
          const bookIndexof = favoriteBooks.indexOf(book);
          favoriteBooks.splice(bookIndexof, 1);
        }
      }
    });

    const filterForm = document.querySelector(select.containerOf.filters);

    filterForm.addEventListener('click', function(event){
      const clickedInput = event.target;

      if(clickedInput.tagName === 'INPUT' && clickedInput.type === 'checkbox' && clickedInput.name === 'filter'){
        if(clickedInput.checked && !filters.includes(clickedInput.value)){
          filters.push(clickedInput.value);
        } else {
          const valueIndexof = filters.indexOf(clickedInput.value);
          filters.splice(valueIndexof, 1);
        }
      }
      filterBooks();
    });
  };

  const filterBooks = function(){

    for(let book in dataSource.books){
      const bookData = dataSource.books[book];
      const filteredBook = document.querySelector('.book__image[data-id="' + bookData.id + '"]');
      let shouldBeHidden = false;

      for(const filter of filters){
        if(!bookData.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      if(shouldBeHidden === true){
        filteredBook.classList.add(classNames.classHidden);
      } else {
        filteredBook.classList.remove(classNames.classHidden);
      }
    }
  };

  const determineRatingBgc = function(rating){
    let background = '';

    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  };

  render();
  initActions();
}