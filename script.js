
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let book1 = new Book("Dune", "Frank Herbert", 412, true)
myLibrary.push(book1);

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

const library = document.querySelector("#library");

let displayBooks = () => {
    library.textContent = "";
    myLibrary.forEach((book) => {
        console.log(book);
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");

        let title = document.createElement("div");
        title.textContent = book.title;

        let author = document.createElement("div");
        author.textContent = book.author;

        let pages = document.createElement("div");
        pages.textContent = book.pages;

        let readDiv = document.createElement("div");
        let read = document.createElement("input");
        read.type = "checkbox";
        read.checked = book.read;
        read.name = "read";
        read.id = "read";
        read.addEventListener("click", () => {
            book.read = !book.read;
            read.checked = book.read;
            console.log(book);
        });
        let readText = document.createElement("span");
        readText.textContent = "Read:";
        readDiv.appendChild(readText);
        readDiv.appendChild(read);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book));
            displayBooks();
        })

        bookElement.appendChild(title);
        bookElement.appendChild(author);
        bookElement.appendChild(pages);
        bookElement.appendChild(readDiv);
        bookElement.appendChild(deleteButton);

        library.appendChild(bookElement);
    });
}

displayBooks();

let formModal = document.querySelector("#form-modal");
const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", () => {
    formModal.classList.toggle("hidden");
})

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => {
    formModal.classList.toggle("hidden");
})

let form = document.querySelector("#new-book-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read") == "on" ? true : false);
    form.reset();
});