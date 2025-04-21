// Sample book data (in a real app, this would come from an API)
const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "fantasy",
        rating: 4.2,
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "sci-fi",
        rating: 4.7,
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 3,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "thriller",
        rating: 4.5,
        description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house in one of London's most desirable areas.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "non-fiction",
        rating: 4.8,
        description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 5,
        title: "People We Meet on Vacation",
        author: "Emily Henry",
        genre: "romance",
        rating: 4.3,
        description: "Poppy and Alex. Alex and Poppy. They have nothing in common. She's a wild child; he wears khakis. She has insatiable wanderlust; he prefers to stay home with a book.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 6,
        title: "The Last Thing He Told Me",
        author: "Laura Dave",
        genre: "mystery",
        rating: 4.1,
        description: "Before Owen Michaels disappears, he smuggles a note to his beloved wife of one year: Protect her.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 7,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        genre: "sci-fi",
        rating: 4.0,
        description: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 8,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "romance",
        rating: 4.6,
        description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 9,
        title: "Educated",
        author: "Tara Westover",
        genre: "non-fiction",
        rating: 4.7,
        description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 10,
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        genre: "fantasy",
        rating: 4.5,
        description: "A magical island. A dangerous task. A burning secret.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 11,
        title: "And Then There Were None",
        author: "Agatha Christie",
        genre: "mystery",
        rating: 4.7,
        description: "Ten strangers are lured to an isolated island mansion off the Devon coast by a mysterious host.",
        cover: "/api/placeholder/220/320"
    },
    {
        id: 12,
        title: "The Woman in the Window",
        author: "A.J. Finn",
        genre: "thriller",
        rating: 4.0,
        description: "Anna Fox lives alone, a recluse in her New York City home, unable to venture outside. She spends her day drinking wine, watching old movies, and spying on her neighbors.",
        cover: "/api/placeholder/220/320"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load wishlist and reviews from localStorage if available
    loadWishlist();
    loadReviews();
    loadRecommendedBooks();
    setupEventListeners();
});
// Local Storage Functions
function getWishlist() {
    const wishlist = localStorage.getItem('bookWishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('bookWishlist', JSON.stringify(wishlist));
}

function getReviews() {
    const reviews = localStorage.getItem('bookReviews');
    return reviews ? JSON.parse(reviews) : [];
}

function saveReviews(reviews) {
    localStorage.setItem('bookReviews', JSON.stringify(reviews));
}

// UI Functions
function loadRecommendedBooks() {
    const recommendedSection = document.getElementById('recommended-books');
    recommendedSection.innerHTML = '';
    
    // Display first 6 books as recommended
    books.slice(0, 6).forEach(book => {
        recommendedSection.appendChild(createBookCard(book));
    });
}

function loadWishlist() {
    const wishlist = getWishlist();
    const wishlistContent = document.getElementById('wishlist-content');
    
    if (wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="empty-state">
                <h3>Your wishlist is empty</h3>
                <p>Books you add to your wishlist will appear here.</p>
            </div>
        `;
        return;
    }
    
    const bookGrid = document.createElement('div');
    bookGrid.className = 'book-grid';
    
    wishlist.forEach(bookId => {
        const book = books.find(b => b.id === bookId);
        if (book) {
            const bookCard = createBookCard(book, true);
            bookGrid.appendChild(bookCard);
        }
    });
    
    wishlistContent.innerHTML = '';
    wishlistContent.appendChild(bookGrid);
}

function loadReviews() {
    const reviews = getReviews();
    const reviewList = document.getElementById('review-list');
    const reviewBookSelect = document.getElementById('review-book');
    
    // Populate review book dropdown
    reviewBookSelect.innerHTML = '<option value="">Select a book...</option>';
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = book.title;
        reviewBookSelect.appendChild(option);
    });
    
    if (reviews.length === 0) {
        reviewList.innerHTML = `
            <div class="empty-state">
                <h3>No reviews yet</h3>
                <p>Your book reviews will appear here.</p>
            </div>
        `;
        return;
    }
    
    reviewList.innerHTML = '';
    reviews.forEach(review => {
        const book = books.find(b => b.id === review.bookId);
        if (book) {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-header">
                    <div>
                        <div class="reviewer-name">${book.title}</div>
                        <div class="book-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    </div>
                    <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                </div>
                <p>${review.text}</p>
            `;
            reviewList.appendChild(reviewCard);
        }
    });
}

function createBookCard(book, isWishlist = false) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;
    
    bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="${book.title}">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-rating">${'★'.repeat(Math.floor(book.rating))}${book.rating % 1 >= 0.5 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(book.rating))}</div>
            <span class="book-genre">${book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}</span>
            <div class="book-actions">
                <button class="btn view-details-btn" data-id="${book.id}">Details</button>
                ${isWishlist ? 
                    `<button class="btn btn-outline remove-wishlist-btn" data-id="${book.id}">Remove</button>` :
                    `<button class="btn btn-outline add-wishlist-btn" data-id="${book.id}">Add to Wishlist</button>`
                }
            </div>
        </div>
    `;
    
    return bookCard;
}

function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const modalContent = document.getElementById('book-modal-content');
    modalContent.innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 0 0 200px;">
                <img src="${book.cover}" alt="${book.title}" style="width: 100%; border-radius: 8px;">
            </div>
            <div style="flex: 1; min-width: 200px;">
                <h2>${book.title}</h2>
                <p style="color: #666;">by ${book.author}</p>
                <div class="book-rating" style="margin: 10px 0;">${'★'.repeat(Math.floor(book.rating))}${book.rating % 1 >= 0.5 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(book.rating))}</div>
                <p style="margin-bottom: 10px;"><span class="book-genre">${book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}</span></p>
                <h4 style="margin-top: 20px;">Description:</h4>
                <p>${book.description}</p>
            </div>
        </div>
    `;
    
    const wishlist = getWishlist();
    const addWishlistBtn = document.getElementById('add-wishlist-modal-btn');
    
    if (wishlist.includes(bookId)) {
        addWishlistBtn.textContent = 'Remove from Wishlist';
    } else {
        addWishlistBtn.textContent = 'Add to Wishlist';
    }
    
    addWishlistBtn.dataset.id = bookId;
    document.getElementById('book-modal').style.display = 'flex';
}

function setupEventListeners() {
    // Genre filter buttons
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const genre = btn.dataset.genre;
            filterByGenre(genre);
        });
    });
    
    // Search functionality
    document.getElementById('search-button').addEventListener('click', () => {
        const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
        if (searchQuery) {
            searchBooks(searchQuery);
        }
    });
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchQuery = e.target.value.toLowerCase().trim();
            if (searchQuery) {
                searchBooks(searchQuery);
            }
        }
    });
    
    // Modal close buttons
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('book-modal').style.display = 'none';
    });
    
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('book-modal').style.display = 'none';
    });
    document.getElementById('book-modal').style.display = 'none';
            }
            
            // Add to Wishlist from modal
            document.getElementById('add-wishlist-modal-btn').addEventListener('click', (e) => {
                const bookId = parseInt(e.target.dataset.id);
                toggleWishlist(bookId);
                document.getElementById('book-modal').style.display = 'none';
            });
            
            // Review tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.dataset.tab;
                    
                    // Update active tab
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show corresponding content
                    if (tabId === 'my-reviews') {
                        document.getElementById('my-reviews-content').style.display = 'block';
                        document.getElementById('add-review-content').style.display = 'none';
                    } else {
                        document.getElementById('my-reviews-content').style.display = 'none';
                        document.getElementById('add-review-content').style.display = 'block';
                    }
                });
            });
            
            // Star rating
            document.querySelectorAll('#star-rating span').forEach(star => {
                star.addEventListener('click', (e) => {
                    const rating = parseInt(e.target.dataset.rating);
                    document.querySelectorAll('#star-rating span').forEach(s => {
                        if (parseInt(s.dataset.rating) <= rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
            });
            
            // Submit review
            document.getElementById('submit-review').addEventListener('click', () => {
                const bookId = parseInt(document.getElementById('review-book').value);
                const text = document.getElementById('review-text').value.trim();
                const ratingStars = document.querySelectorAll('#star-rating span.active');
                const rating = ratingStars.length;
                
                if (!bookId || !text || rating === 0) {
                    alert('Please fill in all fields to submit your review.');
                    return;
                }
                
                addReview(bookId, text, rating);
                
                // Reset form
                document.getElementById('review-book').value = '';
                document.getElementById('review-text').value = '';
                document.querySelectorAll('#star-rating span').forEach(s => s.classList.remove('active'));
                
                // Switch to reviews tab
                document.querySelector('.tab[data-tab="my-reviews"]').click();
            });
            
            // Event delegation for book cards
            document.addEventListener('click', (e) => {
                // View details button
                if (e.target.classList.contains('view-details-btn')) {
                    const bookId = parseInt(e.target.dataset.id);
                    showBookDetails(bookId);
                }
                
                // Add to wishlist button
                if (e.target.classList.contains('add-wishlist-btn')) {
                    const bookId = parseInt(e.target.dataset.id);
                    addToWishlist(bookId);
                }
                
                // Remove from wishlist button
                if (e.target.classList.contains('remove-wishlist-btn')) {
                    const bookId = parseInt(e.target.dataset.id);
                    removeFromWishlist(bookId);
                }
            });
        

        // Book filtering and search
        function filterByGenre(genre) {
            const recommendedSection = document.getElementById('recommended-books');
            recommendedSection.innerHTML = '';
            
            let filteredBooks = books;
            if (genre !== 'all') {
                filteredBooks = books.filter(book => book.genre === genre);
            }
            
            // Only show first 6 books or fewer if filtered
            const booksToShow = filteredBooks.slice(0, 6);
            
            if (booksToShow.length === 0) {
                recommendedSection.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <h3>No books found</h3>
                        <p>No books matching this genre were found.</p>
                    </div>
                `;
                return;
            }
            
            booksToShow.forEach(book => {
                recommendedSection.appendChild(createBookCard(book));
            });
        }

        function searchBooks(query) {
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';
            
            const resultsSection = document.getElementById('search-results-section');
            
            const filteredBooks = books.filter(book => {
                return book.title.toLowerCase().includes(query) || 
                    book.author.toLowerCase().includes(query) || 
                    book.genre.toLowerCase().includes(query) ||
                    book.description.toLowerCase().includes(query);
            });
            
            if (filteredBooks.length === 0) {
                searchResults.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <h3>No results found</h3>
                        <p>Try different keywords or browse by genre.</p>
                    </div>
                `;
            } else {
                filteredBooks.forEach(book => {
                    searchResults.appendChild(createBookCard(book));
                });
            }
            
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Wishlist functions
        function addToWishlist(bookId) {
            const wishlist = getWishlist();
            if (!wishlist.includes(bookId)) {
                wishlist.push(bookId);
                saveWishlist(wishlist);
                loadWishlist();
                
                // Show feedback to user
                alert('Book added to your wishlist!');
            }
        }

        function removeFromWishlist(bookId) {
            const wishlist = getWishlist();
            const index = wishlist.indexOf(bookId);
            if (index !== -1) {
                wishlist.splice(index, 1);
                saveWishlist(wishlist);
                loadWishlist();
            }
        }

        function toggleWishlist(bookId) {
            const wishlist = getWishlist();
            const index = wishlist.indexOf(bookId);
            
            if (index === -1) {
                wishlist.push(bookId);
                alert('Book added to your wishlist!');
            } else {
                wishlist.splice(index, 1);
                alert('Book removed from your wishlist!');
            }
            
            saveWishlist(wishlist);
            loadWishlist();
        }

        // Review functions
        function addReview(bookId, text, rating) {
            const reviews = getReviews();
            
            // Check if review for this book already exists
            const existingIndex = reviews.findIndex(r => r.bookId === bookId);
            
            if (existingIndex !== -1) {
                // Update existing review
                reviews[existingIndex] = {
                    bookId,
                    text,
                    rating,
                    date: new Date().toISOString()
                };
            } else {
                // Add new review
                reviews.push({
                    bookId,
                    text,
                    rating,
                    date: new Date().toISOString()
                });
            }
            
            saveReviews(reviews);
            loadReviews();
        }