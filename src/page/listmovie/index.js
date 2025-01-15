import React, { useEffect, useRef, useState } from "react";
import movieDao from "../../dao/movieDao";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";
import Modal from "../../component/Modal";
import MovieDetail from "../../component/MovieDetail";
import MovieCard from "../../component/MovieCard";
import movieUtils from "../../utils/movieUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortControls from "../../component/SortControl";

export default function ListMovies() {
  const [value, setValue] = useState("Titanic");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    movieDao.getFavorites().then(r => {
      if (r.results) {
        setFavorites(r.results.map(movie => movie.id));
      }
    });
  }, []);

  const toggleFavorite = movieId => {
    if (favorites.includes(movieId)) {
      movieDao.removeFavorite(movieId).then(() => {
        setFavorites(favorites.filter(id => id !== movieId));
        toast.success("Remove success!!");
      });
    } else {
      movieDao.addFavorite(movieId).then(() => {
        setFavorites([...favorites, movieId]);
        toast.success("Add success!!");
      });
    }
  };

  const fetchMoreMovies = async () => {
    if (!hasMore) return;

    const r = await movieDao.findMovieByKey(value, page);
    if (r && r.results) {
      if (r.results.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => [
          ...prevData,
          ...r.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            overview: movie.overview,
            popularity: movie.popularity,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            imageUrl: movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : "https://th.bing.com/th/id/R.b8ba1662f2082e9a340a24f4de8e2959?rik=bktqTTdZjtPuDg&pid=ImgRaw&r=0" //handle null image
          }))
        ]);
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  const searchMovies = () => {
    setPage(1);
    setData([]);
    setHasMore(true);
    fetchMoreMovies();
  };

  return (
    <>
      <div className="d-flex">
        <TextField
          id="outlined-required"
          label="Movie Keyword"
          style={{ marginRight: "10px" }}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          size="large"
          variant="outlined"
          onClick={() => searchMovies()}
          style={{ marginLeft: "10px" }}
        >
          Search <SearchIcon />
        </Button>
      </div>
      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setData={setData}
        data={data}
      />
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="d-flex">
            {data.map(value => {
              return (
                <MovieCard
                  movie={value}
                  onShowDetail={() =>
                    movieUtils.getMovieDetailsWithCredits(
                      value.id,
                      setMovieDetail,
                      setShow
                    )
                  }
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(value.id)}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
      <Modal
        show={show}
        setShow={setShow}
        title={"title"}
        body={<MovieDetail movie={movieDetail} />}
      />
    </>
  );
}
