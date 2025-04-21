const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "fantasy" },
    { title: "Dune", author: "Frank Herbert", genre: "science_fiction" },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "mystery" },
    { title: "Pride and Prejudice", author: "Jane Austen", genre: "romance" },
    { title: "Gone Girl", author: "Gillian Flynn", genre: "thriller" },
    { title: "The Nightingale", author: "Kristin Hannah", genre: "historical_fiction" },
    { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", genre: "fantasy" },
    { title: "Foundation", author: "Isaac Asimov", genre: "science_fiction" },
    { title: "And Then There Were None", author: "Agatha Christie", genre: "mystery" },
    { title: "The Notebook", author: "Nicholas Sparks", genre: "romance" },
    { title: "The Silent Patient", author: "Alex Michaelides", genre: "thriller" },
    { title: "The Book Thief", author: "Markus Zusak", genre: "historical_fiction" }
];

// Local Storage Keys
const WISHLIST_KEY = "wishlist";
const REVIEWS_KEY = "reviews";

// --- Search Functionality ---
function displayBooks(booksToDisplay) {
    const bookListDiv = document.getElementById("book-list");
    bookListDiv.innerHTML = ""; // Clear previous results

    booksToDisplay.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <button class="wishlist-button" data-book-title="${book.title}">Add to Wishlist</button>
        `;
        bookListDiv.appendChild(bookDiv);
    });

    // Add event listeners to wishlist buttons
    const wishlistButtons = document.querySelectorAll(".wishlist-button");
    wishlistButtons.forEach(button => {
        button.addEventListener("click", addToWishlist);
    });
}

function searchBooks() {
    const searchTerm = document.getElementById("search-term").value.toLowerCase();
    const genreFilter = document.getElementById("genre-filter").value;

    let filteredBooks = books;

    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
        );
    }

    if (genreFilter) {
        filteredBooks = filteredBooks.filter(book => book.genre === genreFilter);
    }

    displayBooks(filteredBooks);
}

// --- Wishlist Functionality ---
function addToWishlist(event) {
    const bookTitle = event.target.dataset.bookTitle;
    let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

    if (!wishlist.includes(bookTitle)) {
        wishlist.push(bookTitle);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        alert(`${bookTitle} added to wishlist!`);
        displayWishlist(); // Update wishlist display
    } else {
        alert(`${bookTitle} is already in your wishlist!`);
    }
}

function displayWishlist() {
    const wishlistDiv = document.getElementById("wishlist-books");
    wishlistDiv.innerHTML = ""; // Clear previous wishlist

    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

    if (wishlist.length === 0) {
        wishlistDiv.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach(bookTitle => {
        const book = books.find(book => book.title === bookTitle); // Find book details
        if (book) {
            const bookDiv = document.createElement("div");
            bookDiv.innerHTML = `<p>${book.title} by ${book.author}</p>`;
            wishlistDiv.appendChild(bookDiv);
        } else {
            // Handle case where book is no longer in the main list (e.g., deleted)
            const bookDiv = document.createElement("div");
            bookDiv.innerHTML = `<p>${bookTitle} (Book details not found)</p>`;
            wishlistDiv.appendChild(bookDiv);
        }
    });
}

// --- Reviews Functionality ---
function submitReview() {
    const bookTitle = document.getElementById("review-book-title").value;
    const reviewText = document.getElementById("review-text").value;

    if (!bookTitle || !reviewText) {
        alert("Please enter both a book title and a review.");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || {}; // { bookTitle: [reviews] }

    if (!reviews[bookTitle]) {
        reviews[bookTitle] = [];
    }

    reviews[bookTitle].push(reviewText);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

    displayReviews(); // Update reviews display
    document.getElementById("review-book-title").value = ""; // Clear form
    document.getElementById("review-text").value = "";
}

function displayReviews() {
    const reviewsListDiv = document.getElementById("reviews-list");
    reviewsListDiv.innerHTML = ""; // Clear previous reviews

    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || {};

    for (const bookTitle in reviews) {
        if (reviews.hasOwnProperty(bookTitle)) {
            const bookReviews = reviews[bookTitle];
            const bookReviewsDiv = document.createElement("div");
            bookReviewsDiv.innerHTML = `<h4>${bookTitle}</h4>`;

            bookReviews.forEach(review => {
                const reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review");
                reviewDiv.textContent = review;
                bookReviewsDiv.appendChild(reviewDiv);
            });

            reviewsListDiv.appendChild(bookReviewsDiv);
        }
    }
}

// --- Recommendations Functionality (Simple) ---
function getRecommendations() {
    // This is a very basic recommendation system.  In a real application, you'd use more sophisticated algorithms.
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || {};
    let recommendedBooks = [];

    // Recommend books in the same genre as books on the wishlist
    wishlist.forEach(bookTitle => {
        const book = books.find(book => book.title === bookTitle);
        if (book) {
            const similarBooks = books.filter(b => b.genre === book.genre && !wishlist.includes(b.title) && !recommendedBooks.includes(b.title));
            recommendedBooks = recommendedBooks.concat(similarBooks.slice(0, 2)); // Add up to 2 similar books
        }
    });

    // Recommend books that have positive reviews (very simplistic)
    for (const bookTitle in reviews) {
        if (reviews.hasOwnProperty(bookTitle)) {
            if (reviews[bookTitle].length > 0 && !wishlist.includes(bookTitle) && !recommendedBooks.includes(bookTitle)) {
                const book = books.find(b => b.title === bookTitle);
                if (book) {
                    recommendedBooks.push(book);
                }
            }
        }
    }

    return recommendedBooks;
}

function displayRecommendations() {
    const recommendationsListDiv = document.getElementById("recommendations-list");
    recommendationsListDiv.innerHTML = "";

    const recommendations = getRecommendations();

    if (recommendations.length === 0) {
        recommendationsListDiv.innerHTML = "<p>No recommendations available.</p>";
        return;
    }

    recommendations.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = `<p>${book.title} by ${book.author} (Recommended)</p>`;
        recommendationsListDiv.appendChild(bookDiv);
    });
}

// --- Event Listeners ---
document.getElementById("search-button").addEventListener("click", searchBooks);
document.getElementById("submit-review").addEventListener("click", submitReview);

// --- Initialization ---
displayWishlist();
displayReviews();
displayRecommendations();