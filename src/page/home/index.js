import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListMovies from "../listmovie";
import FavoriteMovie from "../favoritemovie";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div>
        <h1 className="">Movies To Watch</h1>
      </div>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="List All Movies" value="1" />
            <Tab label="My Favorite" value="2" />
          </TabList>
        </Box>
        <TabPanel className="d-panel" value="1">
          <ListMovies />
        </TabPanel>
        <TabPanel value="2">
          <FavoriteMovie />
        </TabPanel>
      </TabContext>
    </>
  );
}
