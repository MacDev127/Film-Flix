const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ad08a5333e20f6cd3a27f418da9e92e1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=ad08a5333e20f6cd3a27f418da9e92e1&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


//-----------Get initial films----------------\\
getFilms(API_URL)

async function getFilms(url) {
    const res = await fetch(url)
    const data = await res.json()

    showFilms(data.results)
}

// ----------HTML classes and API Requests-------------\\
function showFilms(films) {
    main.innerHTML = ''

    films.forEach((film) => {
        const { title, poster_path, vote_average, overview } = film

        const filmEl = document.createElement('div')
        filmEl.classList.add('film');
        filmEl.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="film-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
             </div>
                <div class="overview">
                <h3>Overview</h3>
               ${overview}
             </div>
             
        `
        main.appendChild(filmEl)
    });
}

//------------Average Rating function----------------\\
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote) {
        return 'orange'
    } else {
        return 'red'
    }

}

//--------- search-----------\\
form.addEventListener('submit', (e) => {
    e.preventDefault()



    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getFilms(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})