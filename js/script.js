const globalState = {
  currentPage: window.location.pathname,
};

//display movies
const popularMoviesDisplay = async () => {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);
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
  const API_KEY = "28c44b66e23af35eff059e4a676db902"; //used only for development purposes
  const API_PATH = "https://api.themoviedb.org/3/";
  const response = await fetch(`${API_PATH}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  return data;
};

const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  console.log(links);
  links.forEach((link) => {
    if (link.getAttribute("href") === globalState.currentPage) {
      link.classList.add("active");
    }
  });
};

function addNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const init = () => {
  switch (globalState.currentPage) {
    case "/":
    case "/index.html":
      popularMoviesDisplay();
      break;
    case "/movie-details.html":
      movieDetail();
      break;
    case "/search.html":
      console.log("Search");
      break;
    case "/shows.html":
      popularShowsDisplay();
      break;
    case "/tv-details.html":
      showDetail();
      break;
  }

  highlightActiveLink();
};
document.addEventListener("DOMContentLoaded", init);
