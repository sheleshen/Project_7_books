//Переменные

//Массив данных
const books = [
    {
        id: 1,
        title: 'Планетариум',
        authors: 'Уормелл, Принджа',
        year: '2023',
        image: 'images/1.png'
    },
    {
        id: 2,
        title: 'Ботаникум',
        authors: 'Скотт, Уиллис',
        year: '2023',
        image: '/images/2.png'
    },
    {
        id: 3,
        title:'Океанариум',
        authors: 'Триник, Уайт',
        year: '2023',
        image: '/images/3.png'
    },
    {
        id: 4,
        title: 'Динозавриум',
        authors: 'Уормелл, Маррей',
        year: '2023',
        image: '/images/4.png'
    },
    {
        id: 5,
        title: 'Анатомикум',
        authors: 'Видеман, Пакстон',
        year: '2023',
        image: '/images/5.png'
    }
]

const bookList = document.getElementById('bookList')

const btnAddBook = document.getElementById('btn-add-book')
btnAddBook.addEventListener('click', openForm) 

const btnSaveBook = document.getElementById('btn-save')
btnSaveBook.addEventListener('click', addBook)


//рисуем новый массив
function renderBooks() {
    bookList.innerHTML = ""
    books.forEach((book) => {
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
                    <button class="btn-sec small" onclick='deleteBook(${book.id})'>
                        Удалить
                    </button>
                </div>
            </div>
        `
    })
}  

//Очистить форму
function clearForm() {
    document.getElementById('bookName').value = ""
    document.getElementById('bookAuthor').value = ""
    document.getElementById('bookYear').value = ""
    document.getElementById('bookImage').value = ""
}

//Открыть форму при клике
function openForm() {
    //показать форму при клике
    const addbook = document.getElementById('addBook')
    addbook.style.display = "flex" //показали форму
}

//Добавляем данные, очищаем форму
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
        title: nameValue,
        authors: authorValue,
        year: yearValue,
        image: imageValue
    }

    books.push(newBook)
    renderBooks()
    clearForm()

    // console.log(books)
}

//Удаление данных книги
function deleteBook(id) {
    //найти книгу
    const book = books.find((n) => {
        return n.id === id
    })

    //индекс книги в массиве
    const bookIndex = books.indexOf(book)

    //удалить элемент из массива
    books.splice(bookIndex, 1)

    //показать новый список книг
    renderBooks()
    console.log(books)
}

//Вызываемые функции 
renderBooks()