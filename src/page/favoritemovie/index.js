import React, { useEffect, useState } from "react";
import movieDao from "../../dao/movieDao";
import _get from "lodash/get";
import MovieDetail from "../../component/MovieDetail";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import Modal from "../../component/Modal";

export default function FavoriteMovie() {
  const [favorites, setFavorites] = useState([]);
  const [show, setShow] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    movieDao.getFavorites().then(r => {
      if (r && r.results)
        setFavorites(
          r.results.map(movie => ({
            id: _get(movie, "id", ""),
            title: _get(movie, "title", ""),
            releaseDate: _get(movie, "release_date", ""),
            overview: _get(movie, "overview", ""),
            popularity: _get(movie, "popularity", ""),
            vote_average: _get(movie, "vote_average", ""),
            vote_count: _get(movie, "vote_count", ""),
            imageUrl: _get(movie, "poster_path")
              ? `https://image.tmdb.org/t/p/w154${_get(movie, "poster_path")}`
              : null
          }))
        );
    });
  }, []);

  function showDetail(id) {
    movieDao.getMovieDetail(id).then(r => {
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
          : null,
        backdropPath: _get(r, "backdrop_path")
          ? `https://www.themoviedb.org/t/p/w500${_get(r, "backdrop_path")}`
          : null,
        homepage: _get(r, "homepage", ""),
        imdbId: _get(r, "imdb_id", ""),
        voteAverage: _get(r, "vote_average", 0),
        voteCount: _get(r, "vote_count", 0)
      };

      movieDao.getMovieDetailCredits(id).then(credits => {
        console.log("* Movie Credits:", credits);

        const cast = _get(credits, "cast", []).map(actor => ({
          name: _get(actor, "name", ""),
          character: _get(actor, "character", ""),
          profilePath: _get(actor, "profile_path")
            ? `https://www.themoviedb.org/t/p/w500${_get(
                actor,
                "profile_path"
              )}`
            : null
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
      });
    });
  }

  function getDetail() {
    return (
      <div>
        <MovieDetail movie={movieDetail} />
      </div>
    );
  }

  return (
    <>
      {favorites.length > 0 && (
        <div className="d-flex">
          {favorites.map(value => {
            return (
              <Card
                sx={{
                  width: 300,
                  height: 600,
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height={"400"}
                    image={value.imageUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 6
                      }}
                    >
                      {value.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      )}
      <Modal show={show} setShow={setShow} title={"title"} body={getDetail()} />
    </>
  );
}
