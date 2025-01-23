document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    if (bookId) {
        fetch("./json/books.json")
            .then((response) => response.json())
            .then((data) => {
                const book = data[bookId];
                if (book) {
                    displayBookDetails(book);
                } else {
                    alert("Book not found!");
                    window.location.href = "library.html";
                }
            })
            .catch((error) => console.error("Error loading book details:", error));
    } else {
        alert("Invalid book ID!");
        window.location.href = "library.html";
    }

    function displayBookDetails(book) {
        document.getElementById("bookTitle").textContent = book.title;
        document.getElementById("bookAuthor").textContent = book.author;
        document.getElementById("bookLanguage").textContent = book.language;
        const tagsDisplay = book.tags.join(", ");
        document.getElementById("bookTags").textContent = tagsDisplay;
        document.getElementById("bookDescription").textContent = book.description || "No description available.";
        document.getElementById("bookImage").src = book.image;
        document.getElementById("bookLink").href = book.link || "#";
    }
});


// 
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
                    displaySameTagBooks(books, book);
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

function displaySameTagBooks(books, currentBook) {
    const sameTagBooksList = document.getElementById('sameTagBooksList');
    sameTagBooksList.innerHTML = '';

    const currentTags = currentBook.tags;
    const sameTagBooks = books.filter(book =>
        book.id !== currentBook.id && book.tags.some(tag => currentTags.includes(tag))
    );

    const maxDisplayBooks = 5;
    const displayedBooks = sameTagBooks.slice(0, maxDisplayBooks);

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
            sameTagBooksList.appendChild(bookItem);
        });
    } else {
        sameTagBooksList.innerHTML = '<p>No related books found.</p>';
    }
}