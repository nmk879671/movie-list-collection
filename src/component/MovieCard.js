import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function MovieCard({
  movie,
  onShowDetail,
  onToggleFavorite,
  isFavorite
}) {
  return (
    <Card
      sx={{
        width: 300,
        height: 700,
        margin: "10px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardActionArea onClick={() => onShowDetail(movie.id)}>
        <CardMedia
          component="img"
          height="400"
          image={movie.imageUrl}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
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
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => onShowDetail(movie.id)}
        >
          Detail
        </Button>
        <IconButton onClick={() => onToggleFavorite(movie.id)} color="primary">
          {isFavorite ? <CloseIcon color="error" /> : <AddIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
