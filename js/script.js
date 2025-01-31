const globalState = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "28c44b66e23af35eff059e4a676db902",
    apiPath: "https://api.themoviedb.org/3/",
  },
};

const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  globalState.search.type = urlParams.get("type");
  globalState.search.term = urlParams.get("search-term");

  if (globalState.search.term !== "" && globalState.search.term !== null) {
    const { results, page, total_pages, total_results } = await searchAPIData();
    console.log(results);
    globalState.search.page = page;
    globalState.search.totalPages = total_pages;
    globalState.search.totalResults = total_results;
    if (results.length === 0) {
      showAlert("No result found");
      return;
    }
    displaySearchResults(results);
  } else {
    showAlert("Please enter a search term");
  }
};

const displaySearchResults = (results) => {
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("pagination").innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const link = document.createElement("a");
    link.href = `${globalState.search.type}-details.html?id=${result.id}`;

    const img = document.createElement("img");
    img.src = `${
      result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : "/images/no-image.jpg"
    }`;
    img.classList.add("card-img-top");
    img.alt = `${
      globalState.search.type === "movie" ? result.title : result.name
    }`;

    link.appendChild(img);

    const div2 = document.createElement("div");
    div2.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `${
      globalState.search.type === "movie" ? result.title : result.name
    }`;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");

    const smallText = document.createElement("small");
    smallText.classList.add("text-muted");
    smallText.textContent = `Release: ${
      globalState.search.type === "movie"
        ? result.release_date
        : result.first_air_date
    }`;

    cardText.appendChild(smallText);
    div2.appendChild(cardTitle);
    div2.appendChild(cardText);

    div.appendChild(link);
    div.appendChild(div2);

    document.getElementById("search-results-heading").innerHTML = `<div><b>${
      globalState.search.term
    }</b> (${addNumberWithCommas(
      globalState.search.totalResults
    )} results)</div>`;
    document.getElementById("search-results").appendChild(div);
  });
  displayPagination();
};

const displayPagination = () => {
  const div = document.createElement("div");
  div.classList.add("pagination");

  const pageCounter = document.createElement("div");
  pageCounter.classList.add("page-counter");
  pageCounter.textContent = `Page ${globalState.search.page} of ${globalState.search.totalPages}`;
  div.appendChild(pageCounter);

  if (globalState.search.page > 1) {
    const prevButton = document.createElement("button");
    prevButton.classList.add("btn", "btn-primary");
    prevButton.id = "prev";
    prevButton.textContent = "Prev";
    prevButton.addEventListener("click", async () => {
      globalState.search.page--;
      const { results } = await searchAPIData();
      displaySearchResults(results);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    div.appendChild(prevButton);
  }

  if (globalState.search.page < globalState.search.totalPages) {
    const nextButton = document.createElement("button");
    nextButton.classList.add("btn", "btn-primary");
    nextButton.id = "next";
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", async () => {
      globalState.search.page++;
      const { results } = await searchAPIData();
      displaySearchResults(results);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    div.appendChild(nextButton);
  }
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("pagination").appendChild(div);
};

const displayMovieSlider = async () => {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    const link = document.createElement("a");
    link.href = `movie-details.html?id=${movie.id}`;

    const image = document.createElement("img");
    image.src = `${
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "/images/no-image.jpg"
    }`;
    image.alt = `${movie.title}`;

    link.appendChild(image);

    const rating = document.createElement("h4");
    rating.classList.add("swiper-rating");

    const starIcon = document.createElement("i");
    starIcon.classList.add("fas", "fa-star", "text-secondary");

    rating.appendChild(starIcon);
    rating.appendChild(
      document.createTextNode(`${movie.vote_average.toFixed(1)} / 10`)
    );

    div.appendChild(link);
    div.appendChild(rating);
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
};

const displayShowSlider = async () => {
  const { results } = await fetchAPIData("tv/airing_today");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    const link = document.createElement("a");
    link.href = `tv-details.html?id=${show.id}`;

    const image = document.createElement("img");
    image.src = `${
      show.poster_path
        ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
        : "/images/no-image.jpg"
    }`;
    image.alt = `${show.name}`;

    link.appendChild(image);

    const rating = document.createElement("h4");
    rating.classList.add("swiper-rating");

    const starIcon = document.createElement("i");
    starIcon.classList.add("fas", "fa-star", "text-secondary");

    rating.appendChild(starIcon);
    rating.appendChild(
      document.createTextNode(`${show.vote_average.toFixed(1)} / 10`)
    );

    div.appendChild(link);
    div.appendChild(rating);
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
};

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
//display movies
const popularMoviesDisplay = async () => {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const link = document.createElement("a");
    link.href = `movie-details.html?id=${movie.id}`;

    const img = document.createElement("img");
    img.src = `${
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/images/no-image.jpg"
    }`;
    img.classList.add("card-img-top");
    img.alt = `${movie.title}`;

    link.appendChild(img);

    const div2 = document.createElement("div");
    div2.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `${movie.title}`;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");

    const smallText = document.createElement("small");
    smallText.classList.add("text-muted");
    smallText.textContent = `Release: ${movie.release_date}`;

    cardText.appendChild(smallText);
    div2.appendChild(cardTitle);
    div2.appendChild(cardText);

    div.appendChild(link);
    div.appendChild(div2);

    document.getElementById("popular-movies").appendChild(div);
  });
};

//Display tv shows
const popularShowsDisplay = async () => {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const link = document.createElement("a");
    link.href = `tv-details.html?id=${show.id}`;

    const img = document.createElement("img");
    img.src = `${
      show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : "/images/no-image.jpg"
    }`;

    img.classList.add("card-img-top");
    img.alt = `${show.name}`;

    link.appendChild(img);

    const div2 = document.createElement("div");
    div2.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `${show.name}`;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");

    const smallText = document.createElement("small");
    smallText.classList.add("text-muted");
    smallText.textContent = `Air date: ${show.first_air_date}`;

    cardText.appendChild(smallText);
    div2.appendChild(cardTitle);
    div2.appendChild(cardText);

    div.appendChild(link);
    div.appendChild(div2);

    document.getElementById("popular-shows").appendChild(div);
  });
};

//Display movie details
const movieDetail = async () => {
  const movieId = window.location.search.split("=")[1];
  console.log(movieId);

  const movie = await fetchAPIData(`movie/${movieId}`);

  displayBackgroundImage("movie", movie.backdrop_path);

  const detailsTop = document.createElement("div");
  detailsTop.classList.add("details-top");

  const topLeft = document.createElement("div");
  const topImg = document.createElement("img");
  topImg.src = `${
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/images/no-image.jpg"
  }`;
  topImg.classList.add("card-img-top");
  topImg.alt = `${movie.title}`;
  topLeft.appendChild(topImg);

  const topRight = document.createElement("div");

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = `${movie.title}`;

  const rating = document.createElement("p");
  const starIcon = document.createElement("i");
  starIcon.className = "fas fa-star text-primary";
  rating.appendChild(starIcon);
  rating.appendChild(
    document.createTextNode(`${movie.vote_average.toFixed(1)} / 10`)
  );

  const releaseDate = document.createElement("p");
  releaseDate.className = "text-muted";
  releaseDate.textContent = `Release Date: ${movie.release_date}`;

  const description = document.createElement("p");
  description.textContent = `${movie.overview}`;

  const genresHeading = document.createElement("h5");
  genresHeading.textContent = "Genres";

  const genresList = document.createElement("ul");
  genresList.className = "list-group";
  movie.genres.forEach((genre) => {
    const li = document.createElement("li");
    li.textContent = `${genre.name}`;
    genresList.appendChild(li);
  });

  const homepageLink = document.createElement("a");
  homepageLink.href = `${movie.homepage}`;
  homepageLink.target = "_blank";
  homepageLink.className = "btn";
  homepageLink.textContent = "Visit Movie Homepage";

  topRight.appendChild(movieTitle);
  topRight.appendChild(rating);
  topRight.appendChild(releaseDate);
  topRight.appendChild(description);
  topRight.appendChild(genresHeading);
  topRight.appendChild(genresList);
  topRight.appendChild(homepageLink);

  detailsTop.appendChild(topLeft);
  detailsTop.appendChild(topRight);

  const detailsBottom = document.createElement("div");
  detailsBottom.className = "details-bottom";

  const movieInfoHeading = document.createElement("h2");
  movieInfoHeading.textContent = "Movie Info";

  const infoList = document.createElement("ul");

  const budget = document.createElement("li");
  budget.innerHTML = `<span class="text-secondary">Budget:</span> $${addNumberWithCommas(
    movie.budget
  )}`;

  const revenue = document.createElement("li");
  revenue.innerHTML = `<span class="text-secondary">Revenue:</span> $${addNumberWithCommas(
    movie.revenue
  )}`;

  const runtime = document.createElement("li");
  runtime.innerHTML = `<span class="text-secondary">Runtime:</span> ${movie.runtime} minutes`;

  const status = document.createElement("li");
  status.innerHTML = `<span class="text-secondary">Status:</span> ${movie.status}`;

  infoList.appendChild(budget);
  infoList.appendChild(revenue);
  infoList.appendChild(runtime);
  infoList.appendChild(status);

  const productionHeading = document.createElement("h4");
  productionHeading.textContent = "Production Companies";

  const productionCompanies = document.createElement("div");
  productionCompanies.className = "list-group";
  productionCompanies.innerHTML = `${movie.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(", ")}`;

  detailsBottom.appendChild(movieInfoHeading);
  detailsBottom.appendChild(infoList);
  detailsBottom.appendChild(productionHeading);
  detailsBottom.appendChild(productionCompanies);

  // Append the top and bottom sections to your main container
  const mainContainer = document.getElementById("movie-details"); // Replace with your container's selector
  mainContainer.appendChild(detailsTop);
  mainContainer.appendChild(detailsBottom);
};

const showDetail = async () => {
  const showId = window.location.search.split("=")[1];
  console.log(showId);
  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show);

  displayBackgroundImage("show", show.backdrop_path);

  const detailsTop = document.createElement("div");
  detailsTop.classList.add("details-top");

  const topLeft = document.createElement("div");
  const topImg = document.createElement("img");
  topImg.src = `${
    show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "/images/no-image.jpg"
  }`;
  topImg.classList.add("card-img-top");
  topImg.alt = `${show.name}`;
  topLeft.appendChild(topImg);

  const topRight = document.createElement("div");

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = `${show.name}`;

  const rating = document.createElement("p");
  const starIcon = document.createElement("i");
  starIcon.className = "fas fa-star text-primary";
  rating.appendChild(starIcon);
  rating.appendChild(
    document.createTextNode(`${show.vote_average.toFixed(1)} / 10`)
  );

  const airDate = document.createElement("p");
  airDate.className = "text-muted";
  airDate.textContent = `Air Date: ${show.first_air_date}`;

  const description = document.createElement("p");
  description.textContent = `${show.overview}`;

  const genresHeading = document.createElement("h5");
  genresHeading.textContent = "Genres";

  const genresList = document.createElement("ul");
  genresList.className = "list-group";
  show.genres.forEach((genre) => {
    const li = document.createElement("li");
    li.textContent = `${genre.name}`;
    genresList.appendChild(li);
  });

  const homepageLink = document.createElement("a");
  homepageLink.href = `${show.homepage}`;
  homepageLink.target = "_blank";
  homepageLink.className = "btn";
  homepageLink.textContent = "Visit Movie Homepage";

  topRight.appendChild(movieTitle);
  topRight.appendChild(rating);
  topRight.appendChild(airDate);
  topRight.appendChild(description);
  topRight.appendChild(genresHeading);
  topRight.appendChild(genresList);
  topRight.appendChild(homepageLink);

  detailsTop.appendChild(topLeft);
  detailsTop.appendChild(topRight);

  const detailsBottom = document.createElement("div");
  detailsBottom.className = "details-bottom";

  const movieInfoHeading = document.createElement("h2");
  movieInfoHeading.textContent = "Show Info";

  const infoList = document.createElement("ul");

  const episodeNumber = document.createElement("li");
  episodeNumber.innerHTML = `<span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}`;

  const lastAiredEpisode = document.createElement("li");
  lastAiredEpisode.innerHTML = `<span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}`;

  //  const runtime = document.createElement("li");
  // runtime.innerHTML = `<span class="text-secondary">Runtime:</span> ${movie.runtime} minutes`;

  const status = document.createElement("li");
  status.innerHTML = `<span class="text-secondary">Status:</span> ${show.status}`;

  infoList.appendChild(episodeNumber);
  infoList.appendChild(lastAiredEpisode);
  //infoList.appendChild(runtime);
  infoList.appendChild(status);

  const productionHeading = document.createElement("h4");
  productionHeading.textContent = "Production Companies";

  const productionCompanies = document.createElement("div");
  productionCompanies.className = "list-group";
  productionCompanies.innerHTML = `${show.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(", ")}`;

  detailsBottom.appendChild(movieInfoHeading);
  detailsBottom.appendChild(infoList);
  detailsBottom.appendChild(productionHeading);
  detailsBottom.appendChild(productionCompanies);

  // Append the top and bottom sections to your main container
  const mainContainer = document.getElementById("show-details"); // Replace with your container's selector
  mainContainer.appendChild(detailsTop);
  mainContainer.appendChild(detailsBottom);
};

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

const fetchAPIData = async (endpoint) => {
  const API_KEY = globalState.api.apiKey; //used only for development purposes
  const API_PATH = globalState.api.apiPath;
  showSpinner();

  const response = await fetch(`${API_PATH}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  hideSpinner();
  return data;
};

const searchAPIData = async () => {
  const API_KEY = globalState.api.apiKey; //used only for development purposes
  const API_PATH = globalState.api.apiPath;
  showSpinner();

  const response = await fetch(
    `${API_PATH}search/${globalState.search.type}?api_key=${API_KEY}&query=${globalState.search.term}&page=${globalState.search.page}`
  );
  const data = await response.json();

  hideSpinner();
  return data;
};

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  console.log(links);
  links.forEach((link) => {
    if (link.getAttribute("href") === globalState.currentPage) {
      link.classList.add("active");
    }
  });
};

const showAlert = (message, className = "error") => {
  alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById("alert").appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
};

function addNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const init = () => {
  switch (globalState.currentPage) {
    case "/":
    case "/index.html":
      popularMoviesDisplay();
      displayMovieSlider();
      break;
    case "/movie-details.html":
      movieDetail();
      break;
    case "/search.html":
      search();
      console.log("Search");
      break;
    case "/shows.html":
      popularShowsDisplay();
      displayShowSlider();
      break;
    case "/tv-details.html":
      showDetail();
      break;
  }

  highlightActiveLink();
};
document.addEventListener("DOMContentLoaded", init);
