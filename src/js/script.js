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
    const bookList = document.querySelector(select.containerOf.books);
    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
   
      const book = event.target.offsetParent;
      const bookId = book.getAttribute('data-id');

      if(!book.classList.contains('favorite')){
        book.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        book.classList.remove(classNames.classFavorite);
        const bookIndexOf = favoriteBooks.indexOf(book);
        favoriteBooks.splice(bookIndexOf, 1);
      }
      console.log(favoriteBooks);
    });
  };

  render();
  initActions();
}