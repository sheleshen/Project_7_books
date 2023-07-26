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

// ФУНКЦИИ мод.окно "Добавить книгу"

//Открыть форму при клике
function openModalWindow() {
    const editbook = document.getElementById('modal-window')
    editbook.style.display = "flex"
} 

//Закрыть форму при клике
function closeModalWindow() {  
    const addBook = document.getElementById('modal-window')
    addBook.style.display = "none"

    clearForm()
    styleСhange()
}

//Очистить форму
function clearForm() {
    document.getElementById('bookName').value = ""
    document.getElementById('bookAuthor').value = ""
    document.getElementById('bookYear').value = ""
    document.getElementById('bookImage').value = ""
}

//Смена стиля для input
function styleСhange() {
    document.getElementById('bookName').classList.toggle('input-error')
}

//Добавляем данные и очищаем форму
function addBook() {
    //добавить книгу в список
    const nameValue = document.getElementById('bookName').value
    const authorValue = document.getElementById('bookAuthor').value
    const yearValue = document.getElementById('bookYear').value
    const imageValue = document.getElementById('bookImage').value

    //Проверка для обязательных полей
    if (nameValue === ''){
        document.getElementById('bookName').classList.toggle('input-error')
        // document.getElementById('bookNameError').innerHTML = 'Заполните поле'
        return
    }
    btnSaveBook.addEventListener('click', styleСhange)

    if (authorValue === ''){
        document.getElementById('bookAuthor').classList.toggle('input-error')
        return
    }

    if (yearValue === ''){
        document.getElementById('bookYear').classList.toggle('input-error')
        return
    }

    if (imageValue === ''){
        document.getElementById('bookImage').classList.toggle('input-error')
        return
    }

    //данные новой книги - все значения value хранятся в этой переменной
    const newBook = {
        id: idCounterBook++,
        title: nameValue,
        authors: authorValue,
        year: yearValue,
        image: imageValue
    }

    //скрыть форму при клике на кннопку "Сохранить"
    const addBook = document.getElementById('modal-window')
    addBook.style.display = "none" //скрыли форму

    books.push(newBook)
    renderBooks()
    styleСhange()
    clearForm()
    closeModalWindow()
    saveToLocalStorage()
    // console.log(books)
}


// мод.окно "Редактировать книгу"
const modalWindowEdit = document.getElementById('modal-window-edit') // Найти элемент "Редактировать книгу"

const btnCloseModalWindowEdit = document.getElementById('btn-close-modal-window-edit')   // Кнопка "Закрыть" мод.окно "Ред. книгу"
btnCloseModalWindowEdit.addEventListener('click', closeModalWindowEdit)

const iconCloseModalWindowEdit = document.getElementById('icon-close-modal-window-edit') // Иконка "Закрыть" мод.окно "Ред. книгу"
iconCloseModalWindowEdit.addEventListener('click', closeModalWindowEdit)

const btnSaveEdit = document.getElementById('btn-save-edit') // Кнопка "Сохранить книгу" мод.окно "Ред. книгу"


// ФУНКЦИИ мод.окно "Изменить книгу"

// Получить данные редактируемой книги  
function getInfoBook(book) {
    document.getElementById('bookNameEdit').value = book.title
    document.getElementById('bookAuthorEdit').value = book.authors
    document.getElementById('bookYearEdit').value = book.year
    document.getElementById('bookImageEdit').value = book.image
}

//Открыть форму редактирования при клике
function openModalWindowEdit(id) {
    modalWindowEdit.style.display = "flex"

    //найти книгу по её id
    const book = books.find((n) => {
        return n.id === id 
    })

    // получить данные полей по id
    getInfoBook(book);

    const makeEdit = () => saveEditBook(book.id, makeEdit);
    btnSaveEdit.addEventListener("click", makeEdit);
    
    // saveToLocalStorage()
}

function saveEditBook(id, makeEdit) {
    // функция редактировать книгу по нажатию кнопки
    let book = books.find((findBook) => {
      //ищу нужную книгу
      return findBook.id === id; //найти книгу по id
    });
  
    const bookIndexUp = books.indexOf(book);    //присвоить переменной индексы книг из массива
  
    const nameEdit = document.getElementById("bookNameEdit").value;
    const authorEdit = document.getElementById("bookAuthorEdit").value;
    const yearEdit = document.getElementById("bookYearEdit").value;
    const imageEdit = document.getElementById("bookImageEdit").value;
  
    const newBookEdit = {
      id,
      title: nameEdit,
      authors: authorEdit,
      year: yearEdit,
      image: imageEdit,
    };
  
    btnSaveEdit.removeEventListener("click", makeEdit);  //удалить лишних обработчиков
    books.splice(bookIndexUp, 1, newBookEdit); //удалять книгу и вставлять новую
    renderBooks();
    saveToLocalStorage();
    closeModalWindowEdit();
  }
  

//Закрыть форму редактирования при клике
function closeModalWindowEdit() {  
    const editBook = document.getElementById('modal-window-edit')
    editBook.style.display = "none"
}


// УДАЛЕНИЕ КНИГИ

//Удаление данных книги ЧЕРЕЗ onclick
function deleteBook(id) {
    //найти книгу по её id
    const bookDelete = books.find((n) => {
        return n.id === id 
    })

    //индекс книги в массиве
    const bookIndex = books.indexOf(bookDelete)

    //удалить элемент из массива (1 шт)
    books.splice(bookIndex, 1)

    //показать новый список книг
    renderBooks()
    saveToLocalStorage()
    console.log(books)
}


// ФУНКЦИИ ДЛЯ МАССИВА

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
                    <button class="btn-sec small" id="btn-delete-book-${book.id}"> <!-- onclick='deleteBook(${book.id})'  -->
                        Удалить
                    </button>
                </div>
            </div>
        `
    })

    //проходимся по каждому элементу массива
    books.forEach((book) => {
        const btnDeleteBook  = document.getElementById(`btn-delete-book-${book.id}`)
        btnDeleteBook.addEventListener('click', () => {
            deleteBook(book.id)      //здесь добавляем id, иначе все книги удалятся
        });
    });

    // проходимся по каждому элементу массива
    books.forEach((book) => {
        const btnOpenModalEdit  = document.getElementById(`btn-open-modal-window-edit-${book.id}`)
        btnOpenModalEdit.addEventListener('click', () => {
            openModalWindowEdit(book.id)      //здесь добавляем id, иначе не понятно, что редактировать
        });
    });   

    saveToLocalStorage()
}

//Для Local Storage
function saveToLocalStorage() {
    const booksJSON = JSON.stringify(books) //перевести в JSON
    localStorage.setItem("books", booksJSON) //данные в хранилище
}

//преобразовать JSON в JS
const outBookJSON = localStorage.getItem('books')
if (outBookJSON) {
    books = JSON.parse(outBookJSON);
}

//Вызываемые функции 
renderBooks()
saveToLocalStorage()