const books = [
    {
        id: 1,
        title: "The Shadow's Edge",
        author: "Eleanor Wright",
        genre: ["fantasy", "young-adult"],
        price: 24.99,
        language: "english",
        format: "paperback",
        publicationYear: 2020,
        description: "A young sorceress discovers her true powers while being hunted by shadow creatures in this gripping fantasy adventure."
    },
    {
        id: 2,
        title: "Silent Detective",
        author: "Raymond Parker",
        genre: ["mystery", "thriller"],
        price: 18.50,
        language: "english",
        format: "hardcover",
        publicationYear: 2019,
        description: "Detective Sarah Mills must solve a series of cryptic murders in a city where corruption runs deep."
    },
    {
        id: 3,
        title: "Galactic Empires",
        author: "Isaac Newton",
        genre: ["science-fiction"],
        price: 29.99,
        language: "english",
        format: "hardcover",
        publicationYear: 2022,
        description: "An epic space opera spanning thousands of years and multiple galaxies as humanity expands across the stars."
    },
    {
        id: 4,
        title: "Love in Paris",
        author: "Sophie Laurent",
        genre: ["romance", "historical-fiction"],
        price: 15.99,
        language: "french",
        format: "paperback",
        publicationYear: 2018,
        description: "A passionate romance set in 1920s Paris between an American journalist and a French artist."
    },
    {
        id: 5,
        title: "The Haunting of Blackwood Manor",
        author: "Edgar Williams",
        genre: ["horror", "thriller"],
        price: 21.50,
        language: "english",
        format: "paperback",
        publicationYear: 2021,
        description: "A family moves into an old mansion, only to discover terrifying secrets hidden within its walls."
    },
    {
        id: 6,
        title: "Samurai's Honor",
        author: "Takashi Miyamoto",
        genre: ["manga", "historical-fiction"],
        price: 12.99,
        language: "japanese",
        format: "paperback",
        publicationYear: 2023,
        description: "A beautifully illustrated manga about a wandering samurai seeking redemption in feudal Japan."
    },
    {
        id: 7,
        title: "The Quantum Paradox",
        author: "Lisa Chen",
        genre: ["science-fiction", "thriller"],
        price: 27.99,
        language: "english",
        format: "ebook",
        publicationYear: 2022,
        description: "A physicist discovers a way to manipulate reality, but powerful forces will stop at nothing to control her invention."
    },
    {
        id: 8,
        title: "Napoleon's Secret",
        author: "Pierre Dubois",
        genre: ["historical-fiction", "mystery"],
        price: 32.50,
        language: "french",
        format: "hardcover",
        publicationYear: 2021,
        description: "A historical mystery revolving around a lost artifact from Napoleon's Egyptian campaign."
    },
    {
        id: 9,
        title: "Breaking the Code",
        author: "Alan Mathison",
        genre: ["biography", "non-fiction"],
        price: 22.99,
        language: "english",
        format: "hardcover",
        publicationYear: 2020,
        description: "The definitive biography of a brilliant mathematician who changed the course of World War II."
    },
    {
        id: 10,
        title: "Dragon Realm",
        author: "Eleanor Wright",
        genre: ["fantasy", "young-adult"],
        price: 19.99,
        language: "english",
        format: "paperback",
        publicationYear: 2021,
        description: "The sequel to The Shadow's Edge continues the adventure as our heroes discover an ancient realm of dragons."
    },
    {
        id: 11,
        title: "Mind's Eye",
        author: "Raymond Parker",
        genre: ["mystery", "thriller"],
        price: 16.99,
        language: "english",
        format: "audiobook",
        publicationYear: 2022,
        description: "A psychological thriller about a detective who can see through the eyes of a serial killer."
    },
    {
        id: 12,
        title: "Business Transformed",
        author: "Richard Steel",
        genre: ["non-fiction"],
        price: 35.00,
        language: "english",
        format: "hardcover",
        publicationYear: 2023,
        description: "A comprehensive guide to digital transformation for business leaders in the modern economy."
    },
    {
        id: 13,
        title: "Shattered Dreams",
        author: "Emma Rodriguez",
        genre: ["romance", "drama"],
        price: 14.50,
        language: "spanish",
        format: "paperback",
        publicationYear: 2019,
        description: "A heartbreaking tale of lost love and second chances across two continents."
    },
    {
        id: 14,
        title: "Tokyo Nights",
        author: "Haruki Tanaka",
        genre: ["manga", "thriller"],
        price: 11.99,
        language: "japanese",
        format: "paperback",
        publicationYear: 2022,
        description: "A noir-style manga following a detective in the neon-lit underbelly of Tokyo."
    },
    {
        id: 15,
        title: "Climate Solutions",
        author: "Dr. Sarah Green",
        genre: ["non-fiction", "science"],
        price: 28.99,
        language: "english",
        format: "ebook",
        publicationYear: 2023,
        description: "An accessible guide to understanding climate change and the most promising solutions."
    },
    {
        id: 16,
        title: "The Last Kingdom",
        author: "Harald Erikson",
        genre: ["historical-fiction", "fantasy"],
        price: 26.50,
        language: "english",
        format: "hardcover",
        publicationYear: 2021,
        description: "An epic tale of warriors, kings, and conquest in medieval Scandinavia."
    },
    {
        id: 17,
        title: "The Alchemist's Daughter",
        author: "Marie Laveau",
        genre: ["fantasy", "historical-fiction"],
        price: 19.99,
        language: "french",
        format: "paperback",
        publicationYear: 2018,
        description: "A magical coming-of-age story set in Renaissance France."
    },
    {
        id: 18,
        title: "Whispers in the Dark",
        author: "Edgar Williams",
        genre: ["horror"],
        price: 15.99,
        language: "english",
        format: "ebook",
        publicationYear: 2023,
        description: "A collection of chilling short stories that will keep you awake at night."
    },
    {
        id: 19,
        title: "Star Commander",
        author: "Isaac Newton",
        genre: ["science-fiction"],
        price: 14.99,
        language: "english",
        format: "audiobook",
        publicationYear: 2023,
        description: "An action-packed space adventure following the crew of an interstellar warship."
    },
    {
        id: 20,
        title: "The Enigma Protocol",
        author: "James Blackwood",
        genre: ["thriller", "mystery"],
        price: 22.99,
        language: "english",
        format: "hardcover",
        publicationYear: 2024,
        description: "A race against time to prevent a global catastrophe triggered by an ancient secret society."
    }
];

// Event listener for form submission
document.getElementById('preference-form').addEventListener('submit', function(e) {
    e.preventDefault();
    filterBooks();
});

function filterBooks() {
    // Get form values
    const selectedGenres = Array.from(document.getElementById('genre').selectedOptions).map(option => option.value);
    const authorInput = document.getElementById('author').value.trim().toLowerCase();
    const minPrice = parseFloat(document.getElementById('price-min').value) || 0;
    const maxPrice = parseFloat(document.getElementById('price-max').value) || 1000;
    const language = document.getElementById('language').value;
    const format = document.getElementById('format').value;
    const publicationYear = parseInt(document.getElementById('publication-year').value) || 0;

    // Filter books based on criteria
    let filteredBooks = books.filter(book => {
        // Genre filter
        const genreMatch = selectedGenres.length === 0 || 
            selectedGenres.some(genre => book.genre.includes(genre));
        
        // Author filter
        const authorMatch = authorInput === '' || 
            book.author.toLowerCase().includes(authorInput);
        
        // Price filter
        const priceMatch = book.price >= minPrice && book.price <= maxPrice;
        
        // Language filter
        const languageMatch = language === 'any' || 
            book.language === language;
        
        // Format filter
        const formatMatch = format === 'any' || 
            book.format === format;
        
        // Publication year filter
        const yearMatch = book.publicationYear >= publicationYear;
        
        return genreMatch && authorMatch && priceMatch && languageMatch && formatMatch && yearMatch;
    });

    displayResults(filteredBooks);
}

function displayResults(books) {
    const resultsContainer = document.getElementById('book-results');
    
    if (books.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No books match your preferences. Try adjusting your criteria.</p>';
        return;
    }
    
    let html = '';
    
    books.forEach(book => {
        const genreHtml = book.genre.map(g => `<span class="book-genre">${g.replace('-', ' ')}</span>`).join(' ');
        
        html += `
            <div class="book-card clearfix">
                <div class="book-cover">Book Cover</div>
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <div>${genreHtml}</div>
                    <p><span class="book-price">$${book.price.toFixed(2)}</span> • ${book.format} • ${book.language} • ${book.publicationYear}</p>
                    <p>${book.description}</p>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Initialize with all books displayed
window.onload = function() {
    displayResults(books);
};