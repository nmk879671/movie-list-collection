import React, { useEffect, useState } from "react";
import movieDao from "../../dao/movieDao";
import _get from "lodash/get";
import MovieDetail from "../../component/MovieDetail";
import Modal from "../../component/Modal";
import "../listmovie/index.css";
import MovieCard from "../../component/MovieCard";
import movieUtils from "../../utils/movieUtils";
import { toast } from "react-toastify";
import SortControls from "../../component/SortControl";
import { Button } from "@mui/material";
import Spinner from "../../component/Spinner";

export default function FavoriteMovie() {
  const [favorites, setFavorites] = useState([]);
  const [show, setShow] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSpinner, setShowSpinner] = useState(false);

  const toggleFavorite = movieId => {
    movieDao.removeFavorite(movieId).then(() => {
      toast.success("Remove success!!");
      setFavorites(prevFavorites =>
        prevFavorites.filter(movie => movie.id !== movieId)
      );
    });
  };

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

  return (
    <>
      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setData={setFavorites}
        data={favorites}
      />
      <Button
        size="large"
        variant="contained"
        color="success"
        onClick={() => setShowSpinner(true)}
        style={{ marginBottom: "10px" }}
      >
        Choose a movie to watch
      </Button>
      {favorites.length > 0 && (
        <div className="d-flex">
          {favorites.map(value => (
            <MovieCard
              key={value.id}
              movie={value}
              onShowDetail={() =>
                movieUtils.getMovieDetailsWithCredits(
                  value.id,
                  setMovieDetail,
                  setShow
                )
              }
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
      <Modal
        show={show}
        setShow={setShow}
        body={<MovieDetail movie={movieDetail} />}
      />
      {favorites.length > 0 && (
        <Modal
          show={showSpinner}
          setShow={setShowSpinner}
          body={<Spinner items={favorites.map(r => r.title)} />}
        />
      )}
    </>
  );
}
