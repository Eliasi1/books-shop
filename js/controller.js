'use strict';

function onInit() {
    addBook('harry potter 1', 'Jk.Rowling')
    addBook('harry potter 2', 'Jk.Rowling')
    addBook('harry potter 3', 'Jk.Rowling')
    addBook('harry potter 4', 'Jk.Rowling')
    addBook('harry potter 5', 'Jk.Rowling')
    addBook('harry potter 6', 'Jk.Rowling')
    addBook('the lost simbol', 'Dan Bar-on')
    addBook('tzofen de vinchi', 'Dan Bar-on')
    addBook('the source', 'Dan Bar-on')
    addBook('loonar storm', 'Ohad Elias')
    addBook('irretional man', 'Ohad Elias')
    addBook('only words', 'Worder Sinner')
    addBook('sin eater', 'Worder Sinner')
    renderBooks()
}

function renderBooks() {
    var strHTML = CreateBooksHTMLStr()
    document.querySelector(".book-list").innerHTML = strHTML
}


function renderFilterOptions() {
    var strHTML = CreateFilterOptionsHTMLStr()
    document.querySelector(".filter-writer").innerHTML = strHTML
}

function onBookDelete(id) {
    deleteBook(id)
    renderBooks()
}

function onBookUpdate(name, id, currPrice) {
    var newPrice = +prompt(`set new price for: ${name}`, currPrice)
    updateBook(id, newPrice)
    renderBooks()
}

function onCreateBook() {
    var name = prompt("what is the book name?")
    var writer = prompt("who is the book's writer?")
    addBook(name, writer)
    renderBooks()
}

function onBookBrief(id) {
    var currBook = getBookById(id)
    var currEl = document.querySelector('.brief-modal')
    currEl.classList.add("open")
    currEl.querySelector('h3').innerText = `${currBook.name} - ${currBook.writer}`
    currEl.querySelector('h4 span').innerText = `${currBook.price}$`
    currEl.querySelector('p').innerText = currBook.desc

}

function onCloseModal() {
    var currEl = document.querySelector('.brief-modal')
    currEl.classList.remove("open")
}

function onSetFilterBy(writer) {
    setFilterBy(writer)
    renderBooks()

}

function onSelectSortBy(value) {
    onSelectSortBy(value)
    renderBooks()
}

function onNextPage(prev=false){
    nextPage(prev)
    if (gPage === 0) document.querySelector('.prev-page').classList.add('hidden')
    else  document.querySelector('.prev-page').classList.remove('hidden')
    renderBooks()
}