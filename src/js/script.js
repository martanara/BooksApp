{
  'use strict';

  
  const select = {
    templateOf: {
      book: '#template-book',
    },
    listOf: {
      books: '.books-list',
    }
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const render = function(){
    for(let book in dataSource.books){

      const bookData = dataSource.books[book];
      const generatedHTML = templates.bookItem(bookData);
      const booksDOM = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.listOf.books);
      booksList.appendChild(booksDOM);
    }
  };

  

  render();
}