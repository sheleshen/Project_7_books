//Переменные
let idCounterBook = 1

//Массив данных
let books = [
    {
        id: idCounterBook++,
        title: 'Планетариум',
        authors: 'Уормелл, Принджа',
        year: '2023',
        image: 'images/1.png'
    },
    {
        id: idCounterBook++,
        title: 'Ботаникум',
        authors: 'Скотт, Уиллис',
        year: '2023',
        image: '/images/2.png'
    },
    {
        id: idCounterBook++,
        title:'Океанариум',
        authors: 'Триник, Уайт',
        year: '2023',
        image: '/images/3.png'
    },
    {
        id: idCounterBook++,
        title: 'Динозавриум',
        authors: 'Уормелл, Маррей',
        year: '2023',
        image: '/images/4.png'
    },
    {
        id: idCounterBook++,
        title: 'Анатомикум',
        authors: 'Видеман, Пакстон',
        year: '2023',
        image: '/images/5.png'
    }
]

const bookList = document.getElementById('bookList') //найти контейнер для выгрузки книг

// мод.окно "Добавить книгу"
const ModalWindow = document.getElementById('modal-window')

const btnAddBook = document.getElementById('btn-open-modal-window') // Кнопка вызов формы "Добавить книгу"
btnAddBook.addEventListener('click', openModalWindow) 

const btnCloseModalWindow = document.getElementById('btn-close-modal-window') // Кнопка "Закрыть" мод.окно "Добавить книгу"
btnCloseModalWindow.addEventListener('click', closeModalWindow)

const iconCloseModalWindow = document.getElementById('icon-close-modal-window') // Иконка "Закрыть" мод.окно "Добавить книгу"
iconCloseModalWindow.addEventListener('click', closeModalWindow)

const btnSaveBook = document.getElementById('btn-save') // Кнопка "Сохранить книгу" мод.окно "Добавить книгу"
btnSaveBook.addEventListener('click', addBook)

// мод.окно "Редактировать книгу"
const ModalWindowEdit = document.getElementById('modal-window-edit') // Найти элемент "Редактировать книгу"

const btnEditBook = document.getElementById('btn-open-modal-window-edit') // Кнопка вызов формы "Редактировать книгу"
btnEditBook.addEventListener('click', openModalWindowEdit) 


// ФУНКЦИИ

//Для Local Storage
function saveToLocalStorage() {
    const booksJSON = JSON.stringify(books) //перевести в JSON
    localStorage.setItem("books", booksJSON) //данные в хранилище
}

//Открыть форму при клике
function openModalWindow() {
    const editbook = document.getElementById('modal-window')
    editbook.style.display = "flex"
} 

//Открыть форму редактирования при клике
function openModalWindowEdit(id) {
    const editbook = document.getElementById('modal-window-edit')
    editbook.style.display = "flex"

    //найти книгу по её id
    const bookEdit = books.find((n) => {
        return n.id === id 
    })

    // получить данные по id
    getInfoBook(book);
    
}

//Закрыть форму при клике
function closeModalWindow() {  
    const addBook = document.getElementById('modal-window')
    addBook.style.display = "none"
}

//Закрыть форму редактирования при клике
function closeModalWindowEdit() {  
    const editBook = document.getElementById('modal-window-edit')
    editBook.style.display = "none"
}

//Очистить форму
function clearForm() {
    document.getElementById('bookName').value = ""
    document.getElementById('bookAuthor').value = ""
    document.getElementById('bookYear').value = ""
    document.getElementById('bookImage').value = ""
}

//Добавляем данные и очищаем форму
function addBook() {
    //скрыть форму при клике на кннопку "Сохранить"
    const addBook = document.getElementById('modal-window')
    addBook.style.display = "none" //скрыли форму

    //добавить книгу в список
    const nameValue = document.getElementById('bookName').value
    const authorValue = document.getElementById('bookAuthor').value
    const yearValue = document.getElementById('bookYear').value
    const imageValue = document.getElementById('bookImage').value

    //данные новой книги
    const newBook = {
        id: idCounterBook++,
        title: nameValue,
        authors: authorValue,
        year: yearValue,
        image: imageValue
    }

    books.push(newBook)
    renderBooks()
    clearForm()
    saveToLocalStorage()
    // console.log(books)
}

// Получить данные редактируемой книги  
function getInfoBook(book) {
    document.getElementById('bookName').value = book.title
    document.getElementById('bookAuthor').value = book.authors
    document.getElementById('bookYear').value = book.year
    document.getElementById('bookImage').value = book.image
}

//Рисуем новый массив
function renderBooks() {
    bookList.innerHTML = "" //в контейнере ничего нет
    books.forEach((book) => { //добавляем карточки книг в bookList
        bookList.innerHTML += `
            <div class="book-item">
                <div class="img-contaner">
                    <img class="img-books" src="${book.image}" alt="Книга ${book.title}">
                </div>
                <p class="date-text">
                    ${book.year}
                </p>
                <p class="book-title">
                    ${book.title}
                </p>
                <div class="author-list">
                    <p class="book-author">
                        ${book.authors}
                    </p>
                </div>
                <div class="button-list button-list-indent">
                    <button id="btn-open-modal-window-edit-${book.id}" class="btn small">
                        Изменить
                    </button>
                    <button class="btn-sec small" onclick='deleteBook(${book.id})'> <!-- id="btn-delete-book-${book.id}"  -->
                        Удалить
                    </button>
                </div>
            </div>
        `
    })

    saveToLocalStorage()
}

//Удаление данных книги
function deleteBook(id) {
    //найти книгу по её id
    const bookDelete = books.find((n) => {
        return n.id === id 
    })

    //индекс книги в массиве
    const bookIndex = books.indexOf(bookDelete)

    //удалить элемент из массива
    books.splice(bookIndex, 1)

    //показать новый список книг
    renderBooks()
    saveToLocalStorage()
    console.log(books)
}

//преобразовать JSON в JS
const outBookJSON = localStorage.getItem('books')
if (outBookJSON) {
    books = JSON.parse(outBookJSON);
}

//Вызываемые функции 
renderBooks()
saveToLocalStorage()


// const btnDeleteBook  = document.getElementById('btn-delete-book-${book.id}')
// btnDeleteBook.addEventListener('click', deleteBook)