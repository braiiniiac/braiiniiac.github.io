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
        document.getElementById("bookTag").textContent = book.tag;
        document.getElementById("bookDescription").textContent = book.description || "No description available.";
        document.getElementById("bookImage").src = book.image;
        document.getElementById("bookLink").href = book.link || "#";
    }
});