const myLibrary = [];

function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = true
}

Book.prototype.info = function () {
    return `This book is named ${this.title}, The author is ${this.author}, It has ${this.pages} pages, Read: ${this.read}`
}

Book.prototype.remove = function () {
  let i = myLibrary.indexOf(this)
  myLibrary.splice(i, 1)
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book)
}

const bookContainer = document.querySelector('#book-container')

let index = 0

function displayBooks () {
    bookContainer.innerHTML = '';
    myLibrary.forEach(book => {
        console.log(book.info())
        const bookCard = document.createElement('div')
        bookCard.textContent = book.info();

        // add read button
        const readButton = document.createElement('button')
        readButton.textContent = 'Change Read'
        readButton.setAttribute("id", "readButton");

        //  add remove book button
        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove Book'
        removeButton.setAttribute("id", "removeButton");

        readButton.addEventListener('click', () => {
          switch(book.read) {
            case true:
              book.read = false;
              break;
            case false:
              book.read = true;
              break;
          }
          let update = bookCard.childNodes[0] 
          update.nodeValue = book.info()
        })

        removeButton.addEventListener('click', () => {
          book.remove()
          bookCard.innerHTML = ''
        })

        bookCard.appendChild(readButton)
        bookCard.appendChild(removeButton)
        bookContainer.appendChild(bookCard)
    })
}

const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");

const title = bookDialog.querySelector("#title");
const author = bookDialog.querySelector("#author");
const pages = bookDialog.querySelector("#pages");

const confirmBtn = bookDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
  bookDialog.showModal();
});

bookDialog.addEventListener("close", (e) => {
  bookDialog.close()
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value)
  addBookToLibrary(newBook);
  displayBooks();
  bookDialog.close();
});