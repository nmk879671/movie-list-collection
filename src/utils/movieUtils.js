import _get from "lodash/get";
import movieDao from "../dao/movieDao";

const utils = {
  getMovieDetailsWithCredits: async (id, setMovieDetail, setShow) => {
    try {
      const r = await movieDao.getMovieDetail(id);
      const movieDetails = {
        title: _get(r, "title", ""),
        originalTitle: _get(r, "original_title", ""),
        overview: _get(r, "overview", ""),
        releaseDate: _get(r, "release_date", ""),
        genres: _get(r, "genres", []).map(genre => genre.name),
        budget: _get(r, "budget", 0),
        revenue: _get(r, "revenue", 0),
        runtime: _get(r, "runtime", 0),
        tagline: _get(r, "tagline", ""),
        posterPath: _get(r, "poster_path")
          ? `https://www.themoviedb.org/t/p/w500${_get(r, "poster_path")}`
          : "https://th.bing.com/th/id/R.b8ba1662f2082e9a340a24f4de8e2959?rik=bktqTTdZjtPuDg&pid=ImgRaw&r=0",
        backdropPath: _get(r, "backdrop_path")
          ? `https://www.themoviedb.org/t/p/w500${_get(r, "backdrop_path")}`
          : "https://th.bing.com/th/id/R.b8ba1662f2082e9a340a24f4de8e2959?rik=bktqTTdZjtPuDg&pid=ImgRaw&r=0",
        homepage: _get(r, "homepage", ""),
        imdbId: _get(r, "imdb_id", ""),
        voteAverage: _get(r, "vote_average", 0),
        voteCount: _get(r, "vote_count", 0)
      };

      const credits = await movieDao.getMovieDetailCredits(id);
      const cast = _get(credits, "cast", []).map(actor => ({
        name: _get(actor, "name", ""),
        character: _get(actor, "character", ""),
        profilePath: _get(actor, "profile_path")
          ? `https://www.themoviedb.org/t/p/w500${_get(actor, "profile_path")}`
          : "https://th.bing.com/th/id/R.b8ba1662f2082e9a340a24f4de8e2959?rik=bktqTTdZjtPuDg&pid=ImgRaw&r=0"
      }));

      const director = _get(credits, "crew", [])
        .filter(member => member.job === "Director")
        .map(d => _get(d, "name", ""));

      setMovieDetail({
        ...movieDetails,
        cast,
        director
      });

      setShow(true);
    } catch (error) {
      console.error("Error fetching movie details or credits:", error);
    }
  }
};

export default utils;
