{
  'use strict';

  class BookList {
    constructor(){
      const thisBookList = this;
      
      thisBookList.data = dataSource.books;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

      thisBookList.dom = {
        booksList: document.querySelector('.books-list'),
        filterForm: document.querySelector('.filters'),
      };

      thisBookList.classes = {
        classFavorite: 'favorite',
        classHidden: 'hidden',
      };
    }

    render(){
      const thisBookList = this;

      for(let book in thisBookList.data){

        const bookData = thisBookList.data[book];

        const ratingBgc = thisBookList.determineRatingBgc(bookData.rating);
        bookData.ratingBgc = ratingBgc;
  
        const ratingWidth = bookData.rating * 10;
        bookData.ratingWidth = ratingWidth;
  
        const generatedHTML = thisBookList.template(bookData);
        const booksDOM = utils.createDOMFromHTML(generatedHTML);
        thisBookList.dom.booksList.appendChild(booksDOM);
      }
    }
    determineRatingBgc(rating){
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
    }

    initActions(){
      const thisBookList = this;

      thisBookList.dom.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const book = event.target.offsetParent;
  
        if(book.classList.contains('book__image')){
          const bookId = book.getAttribute('data-id');
  
          if(!book.classList.contains('favorite')){
            book.classList.add('favorite');
            thisBookList.favoriteBooks.push(bookId);
          } else {
            book.classList.remove(thisBookList.classes.classFavorite);
            const bookIndexof = thisBookList.favoriteBooks.indexOf(book);
            thisBookList.favoriteBooks.splice(bookIndexof, 1);
          }
        }
      });
  
      thisBookList.dom.filterForm.addEventListener('click', function(event){
        const clickedInput = event.target;
  
        if(clickedInput.tagName === 'INPUT' && clickedInput.type === 'checkbox' && clickedInput.name === 'filter'){
          if(clickedInput.checked && !thisBookList.filters.includes(clickedInput.value)){
            thisBookList.filters.push(clickedInput.value);
          } else {
            const valueIndexof = thisBookList.filters.indexOf(clickedInput.value);
            thisBookList.filters.splice(valueIndexof, 1);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks(){
      const thisBookList = this;

      for(let book in thisBookList.data){
        const bookData = thisBookList.data[book];
        const filteredBook = document.querySelector('.book__image[data-id="' + bookData.id + '"]');
        let shouldBeHidden = false;
  
        for(const filter of thisBookList.filters){
          if(!bookData.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
  
        if(shouldBeHidden === true){
          filteredBook.classList.add(thisBookList.classes.classHidden);
        } else {
          filteredBook.classList.remove(thisBookList.classes.classHidden);
        }
      }
    }
  }

  new BookList();
}