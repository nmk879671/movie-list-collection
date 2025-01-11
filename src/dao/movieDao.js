const get = async (url) => {
  return await fetch(url + "&api_key=f9a33d6b9189d41ab5f53399f348bd80", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer f9a33d6b9189d41ab5f53399f348bd80",
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error(err));
};

const movieDao = {
  getListMovie: () => {
    return get("https://api.themoviedb.org/3/genre/movie/list?language=en");
  },
  findMovieByKey: (key) => {
    return get(`https://api.themoviedb.org/3/search/movie?query=${key}
`);
  },
  getMovieDetail: (movieId) => {
    return get(`https://api.themoviedb.org/3/movie/${movieId}?`);
  },
};

export default movieDao;
