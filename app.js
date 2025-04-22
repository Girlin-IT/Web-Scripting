/*Create a list (array) of book objects
Each book has: title, genre, and language*/

const allBooks = [
    { title: "The Hobbit", genre: "fantasy", language: "english" },
    { title: "Harry Potter", genre: "fantasy", language: "english" },
    { title: "The Name of the Wind", genre: "fantasy", language: "english" },
    { title: "Dune", genre: "sci-fi", language: "english" },
    { title: "Neuromancer", genre: "sci-fi", language: "english" },
    { title: "Foundation", genre: "sci-fi", language: "english" },
    { title: "Pride and Prejudice", genre: "romance", language: "english" },
    { title: "Me Before You", genre: "romance", language: "english" },
    { title: "The Notebook", genre: "romance", language: "english" },
    { title: "Sherlock Holmes", genre: "mystery", language: "english" },
    { title: "Gone Girl", genre: "mystery", language: "english" },
    { title: "The Girl with the Dragon Tattoo", genre: "mystery", language: "english" },
    { title: "Sapiens", genre: "non-fiction", language: "english" },
    { title: "Educated", genre: "non-fiction", language: "english" },
    { title: "The Immortal Life of Henrietta Lacks", genre: "non-fiction", language: "english" },
    { title: "Cien Años de Soledad", genre: "historical", language: "spanish" },
    { title: "Don Quixote", genre: "historical", language: "spanish" },
    { title: "Les Misérables", genre: "historical", language: "french" },
    { title: "The Shining", genre: "horror", language: "english" },
    { title: "Dracula", genre: "horror", language: "english" },
    { title: "The Girl on the Train", genre: "thriller", language: "english" },
    { title: "The Da Vinci Code", genre: "thriller", language: "english" }
  ];

/*Input: list of books, target HTML container, optional flag to show "Add to Wishlist" button

- Clear the container
- For each book:
   Create a card with title, genre, language
   If showAdd is true:
      - Add a button to add the book to wishlist
   Add the card to the container
*/
  const wishlist = [];

  function displayBooks(books, containerId, showAdd = true) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `<h4>${book.title}</h4><p>Genre: ${book.genre}</p><p>Language: ${book.language}</p>`;
      if (showAdd) {
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add to Wish List';
        addBtn.onclick = () => addToWishList(book);
        card.appendChild(addBtn);
      }
      container.appendChild(card);
    });
  }

/*- Get selected genre and language from dropdowns
-Filter the book list:
   Only include books with the selected genre
   And either matching language or if language is set to 'any'
Call `displayBooks()` to show matching results
*/

  function searchBooks() {
    const genre = document.getElementById('genre-select').value;
    const language = document.getElementById('language-select').value;
    const results = allBooks.filter(book => book.genre === genre && (language === 'any' || book.language === language));
    displayBooks(results, 'search-results');
  }

/*- Check if the book is already in the wishlist
-If not:
    Add the book to the wishlist array
    Display the updated wishlist (without the 'Add' button)
*/

  function addToWishList(book) {
    if (!wishlist.some(b => b.title === book.title)) {
      wishlist.push(book);
      displayBooks(wishlist, 'wishlist', false);
    }
  }

  function submitReview() {
    const title = document.getElementById('review-book').value;
    const text = document.getElementById('review-text').value;
    if (title && text) {
      const reviewDiv = document.getElementById('reviews');
      const review = document.createElement('div');
      review.innerHTML = `<strong>${title}:</strong> ${text}`;
      reviewDiv.appendChild(review);
      document.getElementById('review-book').value = '';
      document.getElementById('review-text').value = '';
    }
  }

  // Personalized recommendations based on most common genre in wishlist
  function getRecommendations() {
    if (wishlist.length === 0) return allBooks.sort(() => 0.5 - Math.random()).slice(0, 6);
    const genreCounts = {};
    wishlist.forEach(book => {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];
    return allBooks.filter(book => book.genre === topGenre && !wishlist.includes(book)).slice(0, 6);
  }

  window.onload = () => {
    displayBooks(getRecommendations(), 'recommended-books');
  };