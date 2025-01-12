import React from "react";
import "./MovieDetail.css";
import { Chip } from "@mui/material";

export default function MovieDetail({ movie }) {
  return (
    <div className="movie-detail">
      <header className="movie-header">
        <h1>{movie.title}</h1>
        <p className="tagline">{movie.tagline}</p>
        <p className="release-date">Release Date: {movie.releaseDate}</p>
      </header>

      <div className="image-section">
        <img
          src={movie.posterPath}
          alt={`${movie.title} Poster`}
          className="poster"
        />
      </div>

      <div className="info-section">
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <ul>
          {movie.genres.map((genre, index) => (
            <Chip label={genre} sx={{ marginRight: "5px" }} />
          ))}
        </ul>
        <h3>Director</h3>
        <p>{movie.director.join(", ")}</p>
        <h3>Runtime</h3>
        <p>{movie.runtime} minutes</p>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-list">
          {movie.cast.map((actor, index) => (
            <div key={index} className="actor-card">
              <img
                src={actor.profilePath || "https://via.placeholder.com/150"}
                alt={actor.name}
              />
              <p>
                <strong>{actor.name}</strong>
              </p>
              <p>as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
