import React, { useState } from "react";
import movieDao from "../../dao/movieDao";
import {
  Avatar,
  Button,
  Checkbox,
  ListItemAvatar,
  ListItemButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";
import _get from "lodash/get";
import * as PropTypes from "prop-types";
import Modal from "../../component/modal";

function Draggable(props) {
  return null;
}

Draggable.propTypes = {
  nodeRef: PropTypes.any,
  cancel: PropTypes.string,
  handle: PropTypes.string,
  children: PropTypes.node,
};
export default function ListMovies() {
  const [value, setValue] = useState("Titanic");
  const [data, setData] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const searchMovies = () => {
    movieDao.findMovieByKey(value).then((r) => {
      if (r && r.results)
        setData(
          r.results.map((movie) => ({
            id: _get(movie, "id", ""),
            title: _get(movie, "title", ""),
            releaseDate: _get(movie, "release_date", ""),
            overview: _get(movie, "overview", ""),
            popularity: _get(movie, "popularity", ""),
            vote_average: _get(movie, "vote_average", ""),
            vote_count: _get(movie, "vote_count", ""),
            imageUrl: _get(movie, "poster_path")
              ? `https://image.tmdb.org/t/p/w154${_get(movie, "poster_path")}`
              : null,
          }))
        );
    });
  };

  function getDetail() {
    return <div>test</div>;
  }

  return (
    <>
      <div className="d-flex">
        <TextField
          id="outlined-required"
          label="Movie Keyword"
          style={{ marginRight: "20px" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          size={"large"}
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={searchMovies}
        >
          Search
        </Button>
      </div>
      {data.length > 0 && (
        <div className="d-flex">
          {data.map((value) => {
            return (
              <Card
                sx={{
                  width: 300,
                  height: 700,
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
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
                        WebkitLineClamp: 6,
                      }}
                    >
                      {value.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => setShow(true)}
                  >
                    Detail
                  </Button>
                  <div>
                    <Checkbox
                      sx={{ marginRight: "10px" }}
                      edge="end"
                      onChange={handleToggle(value.id)}
                      checked={checked.includes(value.id)}
                      inputProps={{ "aria-labelledby": value.id }}
                    />
                  </div>
                </CardActions>
              </Card>
            );
          })}
        </div>
      )}
      <Modal show={show} setShow={setShow} title={"title"} body={getDetail()} />
    </>
  );
}
