// Define an array of book objects with title, genre, language, author, and year
const allBooks = [
    { title: "The Hobbit", genre: "fantasy", language: "english", author: "J R R Tolkien", year: 1937 },
    { title: "Harry Potter", genre: "fantasy", language: "english", author: "J K Rowling", year: 1997 },
    { title: "The Name of the Wind", genre: "fantasy", language: "english", author: "Patrick Rothfuss", year: 2007 },
    { title: "Dune", genre: "sci-fi", language: "english", author: "Franck Herbert", year: 1965 },
    { title: "Neuromancer", genre: "sci-fi", language: "english", author:"William Gibson", year: 1984 },
    { title: "Foundation", genre: "sci-fi", language: "english", author:"Isaac Asimov", year: 1951 },
    { title: "Pride and Prejudice", genre: "romance", language: "english", author:"Jane Austin", year: 1813 },
    { title: "Me Before You", genre: "romance", language: "english", author :"Jojo Moyes", year: 2012 },
    { title: "The Notebook", genre: "romance", language: "english", author :"Nicholas Sparks", year: 1996 },
    { title: "Sherlock Holmes", genre: "mystery", language: "english", author :"Arthur Conan Doyle", year: 1887 },
    { title: "Gone Girl", genre: "mystery", language: "english", author :"Gillian Flynn", year: 2012 },
    { title: "The Girl with the Dragon Tattoo", genre: "mystery", language: "english", author :"Stieg Larsson", year: 2005 },
    { title: "Sapiens", genre: "non-fiction", language: "english", author :"Yuval Noah Harari", year: 2011 },
    { title: "Educated", genre: "non-fiction", language: "english", author :"Tara Westover", year: 2018 },
    { title: "The Immortal Life of Henrietta Lacks", genre: "non-fiction", language: "english", author :"Rebecca Skloot", year: 2010 },
    { title: "Cien Años de Soledad", genre: "historical", language: "spanish", author :"Gabriel García Márquez", year: 1967 },
    { title: "Don Quixote", genre: "historical", language: "spanish", author :"Miguel de Cervantes", year: 1605 },
    { title: "Les Misérables", genre: "historical", language: "french", author :"Victor Hugo", year: 1862 },
    { title: "The Shining", genre: "horror", language: "english", author :"Stephen King", year: 1977 },
    { title: "Dracula", genre: "horror", language: "english", author :"John Green", year: 1897 },
    { title: "The Girl on the Train", genre: "thriller", language: "english", author :" Paula Hawkins", year: 2015 },
    { title: "The Da Vinci Code", genre: "thriller", language: "english", author :"Dan Brown", year: 2003 }
];

// Array to store user's wishlist
const wishlist = [];

// Function to display books in a given container (either search results or wishlist)
function displayBooks(books, containerId, showAdd = true) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card'; // Styling class
        card.innerHTML = `
            <h4>${book.title}</h4>
            <p>Genre: ${book.genre}</p>
            <p>Language: ${book.language}</p>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
        `;
        const btn = document.createElement('button');
        btn.textContent = showAdd ? 'Add to Wishlist' : 'Remove from Wishlist';
        btn.onclick = () => showAdd ? addToWishList(book) : removeFromWishlist(book);
        card.appendChild(btn);
        container.appendChild(card);
    });
}
// Function to search books based on selected genre, language, author, and year
function searchBooks() {
    const genre = document.getElementById('genre-select').value.toLowerCase();
    const language = document.getElementById('language-select').value.toLowerCase();
    const author = document.getElementById('author-name').value.toLowerCase();
    const year = document.getElementById('year-input').value.trim();

    // Apply filtering based on input
    const results = allBooks.filter(book => {
        return book.genre === genre &&
            (language === 'any' || book.language === language) &&
            (author === 'any' || book.author.toLowerCase() === author) &&
            (!year || book.year.toString() === year);
    });

    displayBooks(results, 'search-results');
}

// Add a book to the wishlist if it's not already there
function addToWishList(book) {
    if (!wishlist.some(b => b.title === book.title)) {
        wishlist.push(book);
        displayBooks(wishlist, 'wishlist', false);
    }
}

// Remove a book from the wishlist
function removeFromWishlist(book) {
    const index = wishlist.findIndex(b => b.title === book.title);
    if (index !== -1) {
        wishlist.splice(index, 1);
        displayBooks(wishlist, 'wishlist', false);
    }
}

// Submit a new book review
function submitReview() {
    const title = document.getElementById('review-book').value;
    const text = document.getElementById('review-text').value;
    if (title && text) {
        const reviewDiv = document.getElementById('reviews');
        const review = document.createElement('div');
        review.className = 'review-entry';
        review.innerHTML = `
            <strong>${title}:</strong> <span class="review-text">${text}</span>
            <button onclick="editReview(this)">Edit</button>
            <button onclick="deleteReview(this)">Delete</button>
        `;
        reviewDiv.appendChild(review);
        document.getElementById('review-book').value = '';
        document.getElementById('review-text').value = '';
    }
}

// Edit an existing review's text
function editReview(button) {
    const reviewDiv = button.parentElement;
    const textSpan = reviewDiv.querySelector('.review-text');
    const newText = prompt("Edit your review:", textSpan.textContent);
    if (newText !== null) {
        textSpan.textContent = newText;
    }
}

// Delete a review
function deleteReview(button) {
    const reviewDiv = button.parentElement;
    reviewDiv.remove();
}

// Recommend books based on genre most represented in wishlist
function getRecommendations() {
    if (wishlist.length === 0) return allBooks.sort(() => 0.5 - Math.random()).slice(0, 6);
    const genreCounts = {};
    wishlist.forEach(book => {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];
    return allBooks.filter(book => book.genre === topGenre && !wishlist.includes(book)).slice(0, 6);
}

// Run on initial load
window.onload = () => {
    displayBooks(getRecommendations(), 'recommended-books');
};
