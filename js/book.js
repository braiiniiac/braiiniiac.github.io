document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (bookId) {
        fetch(`./json/books.json`)
            .then(response => response.json())
            .then(books => {
                const book = books.find(b => b.id === bookId);
                if (book) {
                    displayBookDetails(book);
                    displayRelatedBooks(books, book);
                }
            });
    }
});

function displayBookDetails(book) {
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = book.author;
    document.getElementById('bookLanguage').textContent = book.language;
    document.getElementById('bookTags').textContent = book.tags.join(', ');
    document.getElementById('bookDescription').textContent = book.description;
    document.getElementById('bookImage').src = book.image;
    document.getElementById('bookLink').href = book.link;
}

function displayRelatedBooks(books, currentBook) {
    const relatedBooksList = document.getElementById('sameTagBooksList');
    relatedBooksList.innerHTML = '';

    const currentBookSeriesName = currentBook.title.split(' - ')[0];

    const sameSeriesBooks = books.filter(book => {
        const bookSeriesName = book.title.split(' - ')[0];
        return book.id !== currentBook.id && bookSeriesName === currentBookSeriesName;
    });


    const currentTags = currentBook.tags;
    const sameTagBooks = books.filter(book =>
        book.id !== currentBook.id &&
        !sameSeriesBooks.includes(book) &&
        book.tags.some(tag => currentTags.includes(tag))
    );

    const maxDisplayBooks = 5; 
    const displayedBooks = [...sameSeriesBooks, ...sameTagBooks.slice(0, maxDisplayBooks)];

    if (displayedBooks.length > 0) {
        displayedBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            `;
            bookItem.addEventListener('click', () => {
                window.location.href = `book.html?id=${book.id}`;
            });
            relatedBooksList.appendChild(bookItem);
        });
    } else {
        relatedBooksList.innerHTML = '<p>No related books found.</p>';
    }
}
