const get = async url => {
  return await fetch(url + "&api_key=f9a33d6b9189d41ab5f53399f348bd80", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWEzM2Q2YjkxODlkNDFhYjVmNTMzOTlmMzQ4YmQ4MCIsIm5iZiI6MTczNjU3NjU4NS4wOTc5OTk4LCJzdWIiOiI2NzgyMGU0OTJiMjlhOTE4ZDA0ZTllZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._Ij40rKDxnBJIHtpy5bFUtBfnjiZs2rBRwpf_5tyCoE"
    }
  })
    .then(res => res.json())
    .then(json => json)
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
  getListMovie: () => {
    return get("https://api.themoviedb.org/3/genre/movie/list?language=en");
  },
  findMovieByKey: key => {
    return get(`https://api.themoviedb.org/3/search/movie?query=${key}
`);
  },
  getMovieDetail: movieId => {
    return get(`https://api.themoviedb.org/3/movie/${movieId}?language=`);
  },
  getMovieDetailCredits: movieId => {
    return get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=`
    );
  },
  addFavorite: movieId => {
    return post("https://api.themoviedb.org/3/account/21743480/favorite", {
      media_type: "movie",
      media_id: movieId,
      favorite: true
    });
  },
  removeFavorite: movieId => {
    return post(
      "https://api.themoviedb.org/3/account/21743480/favorite",
      {
        media_type: "movie",
        media_id: movieId,
        favorite: false
      }
    );
  },
  getFavorites: () => {
    return get("https://api.themoviedb.org/3/account/21743480/favorite/movies?page=1");
  }
};

export default movieDao;
