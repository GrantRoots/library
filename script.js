const myLibrary = [];

function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  read = true
}

Book.prototype.info = function () {
    return `This book is named ${this.title}, ${this.author} is the author, It has ${this.pages} pages, ${this.read}`
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
        readButton.textContent = 'Did you read this?'
        readButton.setAttribute("id", "readButton");

        //  add remove book button
        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove Book'
        removeButton.setAttribute("id", "removeButton");

        bookCard.appendChild(readButton)
        bookCard.appendChild(removeButton)
        bookContainer.appendChild(bookCard)

        removeButton.addEventListener('click', () => {
          book.remove()
        })
    })
}

const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");

const title = bookDialog.querySelector("#title");
const author = bookDialog.querySelector("#author");
const pages = bookDialog.querySelector("#pages");

const confirmBtn = bookDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  bookDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
bookDialog.addEventListener("close", (e) => {
  outputBox.value =
    bookDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${title.value} ${author.value} ${pages.value}`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  let newBook = new Book(title.value, author.value, pages.value)
  addBookToLibrary(newBook);
  displayBooks();
  bookDialog.close(); // Have to send the select box value here.
});

function removeBook() {

}