document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("bookList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const tagSearchInput = document.getElementById("tagSearchInput");
    const tagFilter = document.getElementById("tagFilter");
    const languageFilter = document.getElementById("languageFilter");

    let books = [];

    // Fetch books from JSON
    fetch("./json/books.json")
        .then((response) => response.json())
        .then((data) => {
            books = data;
            displayBooks(books);
        })
        .catch((error) => console.error("Error loading books:", error));

    // Display books
    function displayBooks(books) {
        bookList.innerHTML = "";
        books.forEach((book) => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";

            const tagsDisplay = book.tags.join(", ");

            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Language:</strong> ${book.language}</p>
                <p><strong>Tags:</strong> ${tagsDisplay}</p>
            `;

            bookItem.addEventListener("click", () => {
                window.location.href = `book.html?id=${book.id}`;
            });

            bookList.appendChild(bookItem);
        });
    }

    // Search function
    function searchBooks() {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(
            (book) =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    }

    // Search by tag function
    function searchByTag() {
        const tagQuery = tagSearchInput.value.toLowerCase();
        const filteredBooks = books.filter((book) =>
            book.tags.some((tag) => tag.toLowerCase().includes(tagQuery))
        );
        displayBooks(filteredBooks);
    }

    // Filter by tag and language
    function filterBooks() {
        const tag = tagFilter.value;
        const language = languageFilter.value;

        let filteredBooks = books;

        // Filter by tag
        if (tag) {
            filteredBooks = filteredBooks.filter((book) => book.tags.includes(tag));
        }

        // Filter by language
        if (language) {
            filteredBooks = filteredBooks.filter((book) => book.language === language);
        }

        displayBooks(filteredBooks);
    }

    // Event listeners
    searchButton.addEventListener("click", searchBooks);
    searchInput.addEventListener("input", searchBooks);
    tagSearchInput.addEventListener("input", searchByTag);
    tagFilter.addEventListener("change", filterBooks);
    languageFilter.addEventListener("change", filterBooks);
});

// Load tags from tags.json
fetch('./json/tags.json')
    .then(response => response.json())
    .then(tags => {
        const tagFilter = document.getElementById('tagFilter');
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading tags:', error));