import React, { useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SortControls({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  setData,
  data
}) {
  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      let comparison = 1;
      switch (sortBy) {
        case "popularity":
          comparison = b.popularity - a.popularity;
          break;
        case "releaseDate":
          comparison = new Date(b.releaseDate) - new Date(a.releaseDate);
          break;
        case "voteAverage":
          comparison = b.vote_average - a.vote_average;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setData(sortedData);
  };

  useEffect(() => {
    sortData();
  }, [sortBy, sortOrder]);

  return (
    <div style={{ margin: "20px 0 20px -10px" }}>
      <Select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        style={{ marginLeft: "10px", width: "200px" }}
      >
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
        <MenuItem value="voteAverage">Vote Average</MenuItem>
        <MenuItem value="title">Title</MenuItem>
      </Select>
      <Button
        size="large"
        variant="outlined"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        style={{ marginLeft: "20px" }}
      >
        Sort{" "}
        {sortOrder === "asc" ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </Button>
    </div>
  );
}
