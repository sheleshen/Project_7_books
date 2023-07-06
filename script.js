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

function renderBooks() {
    bookList.innerHTML = ""
    books.forEach((book) => {
        bookList.innerHTML += `
            <div class="book-item">
                <img class="img-books" src="${book.image}" alt="Книга ${book.title}">
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

function deleteBook (id) {
    //найти книгу
    const book = books.find((s) => {
        return s.id === id
    })

    //индекс книги в массиве
    const bookIndex = books.indexOf(book)

    //удалить элемент из массива
    books.splice(bookIndex, 1)

    //показать новый список книг
    renderBooks()
}


//Вызываемые функции 
renderBooks()