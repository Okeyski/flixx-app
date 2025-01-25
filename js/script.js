const globalState = {
    currentPage: window.location.pathname
}

const popularMoviesDisplay = async () => {
    const { results } = await fetchAPIData('movie/popular')
    console.log(results);
    results.forEach(movie => {
        const div = document.createElement("div");
        div.classList.add("card");

        const link = document.createElement("a");
        link.href = `movie-details.html?id=${movie.id}`;

        const img = document.createElement("img");
        img.src = `${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/images/no-image.jpg"
        }` 
        

        img.classList.add("card-img-top");
        img.alt = `${movie.name}`;

        link.appendChild(img);

        const div2 = document.createElement("div");
        div2.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = `${movie.name}`;

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
        
        document.getElementById('popular-movies').appendChild(div)
    });
}

const popularShowsDisplay = async () => {
    const { results } = await fetchAPIData('tv/popular')
    console.log(results);
    results.forEach(show => {
        const div = document.createElement("div");
        div.classList.add("card");

        const link = document.createElement("a");
        link.href = `tv-details.html?id=${show.id}`;

        const img = document.createElement("img");
        img.src = `${show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/images/no-image.jpg"
        }` 
        

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
        
        document.getElementById('popular-shows').appendChild(div)
    });
}





const fetchAPIData = async (endpoint) => {
    const API_KEY = '28c44b66e23af35eff059e4a676db902' //used only for development purposes
    const API_PATH = 'https://api.themoviedb.org/3/'
    const response = await fetch(`${API_PATH}${endpoint}?api_key=${API_KEY}`)
    
    const data = await response.json()

    return data
}



const highlightActiveLink = () =>{
    const links = document.querySelectorAll('.nav-link')
    console.log(links);
    links.forEach(link => {
        if (link.getAttribute('href') === globalState.currentPage) {
            link.classList.add('active')
        }
        
    });
}










const init = ()=> {
    switch (globalState.currentPage) {
        case '/':
        case '/index.html':
        popularMoviesDisplay();    
            break;
        case '/movie-details.html':
        console.log('Movies');            
            break;
        case '/search.html':
        console.log('Search');            
            break;
        case '/shows.html':
        popularShowsDisplay();            
            break;
        case '/tv-details.html':
        console.log('Details');            
            break;
    }

    highlightActiveLink()
}
document.addEventListener('DOMContentLoaded', init)