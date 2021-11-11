{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    bookItem: {
      clickable: '.books-list .book__image',
    },
  };

  const classNames = {
    classFavorite: 'favorite',
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const render = function(){
    for(let book in dataSource.books){

      const bookData = dataSource.books[book];
      const generatedHTML = templates.bookItem(bookData);
      const booksDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.containerOf.books);
      booksList.appendChild(booksDOM);
    }
  };

  const favoriteBooks = [];

  const initActions = function(){
    const bookItems = document.querySelectorAll(select.bookItem.clickable);

    for(let bookItem of bookItems){

      bookItem.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = bookItem.getAttribute('data-id');
        if(!bookItem.classList.contains('favorite')){
          bookItem.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          bookItem.classList.remove(classNames.classFavorite);
          const bookIndexOf = favoriteBooks.indexOf(bookItem);
          favoriteBooks.splice(bookIndexOf, 1);
        }
      });
      bookItem.addEventListener('click', function (event){
        event.preventDefault();
      });
    }
  };

  render();
  initActions();
}