'use strict';

var gBooks = []
var gWriters = []
var STORAGE_KEY = 'bookDB'
var gFilterBy = {writer : '', maxPrice : 300}
var gPage = 0
var gPageItemsCount = 5


function getBooks(){
    var filtereByWriter = gBooks.filter((book) => !gFilterBy.writer ? book : gFilterBy.writer === book.writer)
    var filteredByPrice = filtereByWriter.filter((book) => book.price < gFilterBy.maxPrice)
    return filteredByPrice.slice(gPage*gPageItemsCount,gPage*gPageItemsCount+5)
}

function CreateBooksHTMLStr(){
    var strHTML = getBooks().map(book => `
    <tr class="book-row">
    <td><img src="img/${book.name}.jpg" width="100px" height="150px" onerror='this.onerror=null;this.src="img/default.jfif"'></td>
    <td>
        <h5 class="name">Name: <span>${book.name}</span></h5>
        <h5 class="writer">Writer: <span>${book.writer}</span></h5>
        <h5 class="price">price: <span>${book.price}</span>$</h5>
        <h5 class="book-id">book-id: <span>${book.id}</span></h5>
    </td>
    <td>
        <button onclick="onBookBrief('${book.id}')">Brief</button>
        <button onclick="onBookDelete('${book.id}')">delete</button>
        <button onclick="onBookUpdate('${book.name}','${book.id}','${book.price}')">update</button>
    </td>
</tr>
    `)
    return strHTML.join('')
}

function CreateFilterOptionsHTMLStr(){
    var strHTML = gWriters.map((writer) =>`
    <option value="${writer}">${writer}</option>
    `)
    strHTML.push('<option value="">All</option>')
    return strHTML.join('')
}

function _createBooks(){}

function _createBook(name, writer) {
   return {
    id : makeId(),
    name,
    writer,
    price : getRandomIntInclusive(50,250),
    desc : makeLorem()
    // imgUrl : `img/${name}`
   }
}

function addBook (name,writer){
    const book = _createBook(name,writer)
    gBooks.unshift(book)
    updateWritersList()
    // _saveBooksToStorage()
    return book
}

function updateWritersList(){
    gWriters = gBooks.reduce((writersArr,book) => {
        console.log("Called with ", writersArr, book.name)
        var currBookWriter = book.writer
        if (!writersArr.includes(currBookWriter))  writersArr.push(currBookWriter)
        return writersArr
    },["select-writer"])
    renderFilterOptions()
}

function _saveBooksToStorage(){
    saveToStorage('gBooks', gBooks)
}

function deleteBook(bookId){
    gBooks = gBooks.filter((book)=>book.id !== bookId)
}

function updateBook(bookId, newPrice){
    var requestedIdx = gBooks.findIndex((book)=>book.id === bookId)
    gBooks[requestedIdx].price = newPrice
}

function getBookById (bookId){
    return gBooks.find((book)=> book.id === bookId)
}

function setFilterBy(writer){
    if (writer.writer) gFilterBy.writer = writer.writer
    if (writer.maxPrice) gFilterBy.maxPrice = writer.maxPrice

}

function onSelectSortBy(value){
    switch (value){
        case 'price':
            gBooks.sort((a,b) => a.price - b.price)
            break
        case 'writer':
            gBooks.sort((a,b) => {
                const nameA = a.writer.toUpperCase()
                const nameB = b.writer.toUpperCase()
                if (nameA>nameB) return 1
                else if (nameA<nameB) return -1
                else return 0     
            })
            break
        case '':
            break
    }
}

function nextPage(prev){
    switch (prev) {
        case true :
            if (gPage===0) return
            gPage--
            break
        case false :
            if(gPage === Math.floor(gBooks.length/gPageItemsCount) ) return
            gPage++
    }
}
