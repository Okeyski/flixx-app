# Flixx App 🎬

Flixx App is a movie and TV show discovery web application that allows users to search for movies and TV shows, view details, and navigate through paginated search results. The app is built using **HTML, CSS, and JavaScript**, with data fetched from [The Movie Database (TMDb) API](https://www.themoviedb.org/).

This project is based on a project from Brad Traversy's *Modern JavaScript from the Beginning* course.

---

## 🚀 Features

- 🔍 **Movie & TV Show Search**: Search for movies and TV shows by title.
- 📜 **Paginated Search Results**: Browse through multiple pages of search results with a smooth pagination experience.
- 🖼️ **Dynamic UI**: Movie and TV show posters are displayed with title and release date.
- 🔄 **Navigation & Filtering**: Users can choose between movies and TV shows before searching.
- 🎞️ **Movie & TV Show Details**: View detailed information about movies and TV shows.

---

## 📂 Project Structure

```
flixx-app/
│── index.html         # Homepage
│── search.html        # Search results page
│── js/
│   └── script.js      # Main JavaScript logic
│── css/
│   ├── style.css      # Main styles
│   ├── spinner.css    # Loader styles
│── lib/
│   ├── swiper.css     # Swiper styles
│   ├── fontawesome.css# Icons
│   ├── swiper.js      # Swiper JS
│── images/            # Placeholder images
│── README.md          # Documentation
```

---

## 🛠️ Setup & Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/Okeyski/flixx-app.git
   ```

2. **Open the Project**: Navigate to the project directory and open `index.html` in a browser.

3. **Run Locally**:

   - You can use a simple local server (e.g., VS Code Live Server extension) for better experience.
   - Or open `index.html` directly in your browser.

---

## 🔑 API Integration

Flixx App uses **The Movie Database (TMDb) API** for fetching movies and TV shows. Ensure you have an API key.

- The API key is stored in `script.js`:
  ```js
  api: {
    apiKey: "YOUR_API_KEY_HERE",
    apiPath: "https://api.themoviedb.org/3/",
  }
  ```
- Replace `YOUR_API_KEY_HERE` with your actual TMDb API key.

---

## 🎯 Usage

1. **Search for Movies or TV Shows**: Enter a search term and select either **Movies** or **TV Shows**, then click the search button.
2. **Pagination**:
   - Click **Next** to load more results.
   - Click **Prev** to go back.
   - The page scrolls to the top when new results are loaded.
3. **View Details**: Click on a movie or show to view more details.

---

## ✨ Technologies Used

- **HTML, CSS, JavaScript**
- **TMDb API** for movie and TV show data
- **Swiper.js** for interactive sliders
- **FontAwesome** for icons

---

## 📝 License

This project is licensed under the MIT License. Feel free to modify and use it.

---

## 📧 Contact

For any questions or contributions, feel free to reach out:
- **Email**: okeyski@gmail.com

Happy coding! 🚀🎬

