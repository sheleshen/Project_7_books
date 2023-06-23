const books = [
    {
        title: 'Планетариум',
        authors: 'Уормелл, Принджа',
        year: '2023',
        image: 'images/1.png'
    },
    {
        title: 'Ботаникум',
        authors: 'Скотт, Уиллис',
        year: '2023',
        image: '/images/2.png'
    },
    {
        title:'Океанариум',
        authors: 'Триник, Уайт',
        year: '2023',
        image: '/images/3.png'
    },
    {
        title: 'Динозавриум',
        authors: 'Уормелл, Маррей',
        year: '2023',
        image: '/images/4.png'
    },
    {
        title: 'Анатомикум',
        authors: 'Видеман, Пакстон',
        year: '2023',
        image: '/images/5.png'
    }
    ]

const bookList = document.getElementById('bookList')

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
                <button class="btn-sec small">
                    Удалить
                </button>
            </div>
        </div>
    `
})