const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
    return (this.title, this.author, this.pages, this.read)
}

function addBookToLibrary(book) {
  // do stuff here
  // add book in library
}

function displayBooks () {
    for (book in myLibrary) {
        const card = document.createElement('div')
        book.textContent = book.info()
    }
}

// new

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
  const newBook = new Book(title.value, author.value, pages.value)
  addBookToLibrary(newBook);
  bookDialog.close(); // Have to send the select box value here.
});