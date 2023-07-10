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

const btnAddBook = document.getElementById('btn-add-book') // Кнопка вызов формы "Добавить книгу"
btnAddBook.addEventListener('click', openForm) 

const btnSaveBook = document.getElementById('btn-save') // Кнопка "Сохранить книгу"
btnSaveBook.addEventListener('click', addBook)

// функция для Local Storage
function saveToLocalStorage() {
    const booksJSON = JSON.stringify(books) //перевести в JSON
    localStorage.setItem("books", booksJSON) //данные в хранилище
}

//преобразовать JSON в JS ???
const outBookJSON = localStorage.getItem('books')
if (outBookJSON) {
    books = JSON.parse(outBookJSON);
}
// const outBookJSON = localStorage.getItem('books')
// const books = JSON.parse(outBookJSON);

//Открыть форму при клике
function openForm() {
    //показать форму при клике
    const addbook = document.getElementById('addBook')
    addbook.style.display = "flex" //показали форму
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
    //скрыть форму при клике
    const addBook = document.getElementById('addBook')
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
    console.log(books)
}

//рисуем новый массив
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
                <div class="button-list">
                    <button class="btn small">
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

//Вызываемые функции 
renderBooks()
saveToLocalStorage()


// const btnDeleteBook  = document.getElementById('btn-delete-book-${book.id}')
// btnDeleteBook.addEventListener('click', deleteBook)