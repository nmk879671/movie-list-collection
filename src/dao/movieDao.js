const API_KEY = "f9a33d6b9189d41ab5f53399f348bd80";
const BASE_URL = "https://api.themoviedb.org/3";

const get = async url => {
  return await fetch(`${url}&api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWEzM2Q2YjkxODlkNDFhYjVmNTMzOTlmMzQ4YmQ4MCIsIm5iZiI6MTczNjU3NjU4NS4wOTc5OTk4LCJzdWIiOiI2NzgyMGU0OTJiMjlhOTE4ZDA0ZTllZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._Ij40rKDxnBJIHtpy5bFUtBfnjiZs2rBRwpf_5tyCoE"
    }
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

const post = async (url, body) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWEzM2Q2YjkxODlkNDFhYjVmNTMzOTlmMzQ4YmQ4MCIsIm5iZiI6MTczNjU3NjU4NS4wOTc5OTk4LCJzdWIiOiI2NzgyMGU0OTJiMjlhOTE4ZDA0ZTllZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._Ij40rKDxnBJIHtpy5bFUtBfnjiZs2rBRwpf_5tyCoE"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(json => json)
    .catch(err => console.error(err));
};

const movieDao = {
  findMovieByKey: (key, page = 1) => {
    return get(
      `${BASE_URL}/search/movie?query=${key}&page=${page}&sort_by=popularity.desc`
    );
  },
  getMovieDetail: movieId => {
    return get(`${BASE_URL}/movie/${movieId}?language=en-US`);
  },
  getMovieDetailCredits: movieId => {
    return get(`${BASE_URL}/movie/${movieId}/credits?language=en-US`);
  },
  addFavorite: movieId => {
    return post(`${BASE_URL}/account/21743480/favorite`, {
      media_type: "movie",
      media_id: movieId,
      favorite: true
    });
  },
  removeFavorite: movieId => {
    return post(`${BASE_URL}/account/21743480/favorite`, {
      media_type: "movie",
      media_id: movieId,
      favorite: false
    });
  },
  getFavorites: async () => {
    let page = 1;
    let allFavorites = [];
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await get(
        `${BASE_URL}/account/21743480/favorite/movies?page=${page}`
      );
      if (response && response.results && response.results.length > 0) {
        allFavorites = [...allFavorites, ...response.results];
        page++;
      } else {
        hasMorePages = false;
      }
    }
    return { results: allFavorites };
  }
};

export default movieDao;
