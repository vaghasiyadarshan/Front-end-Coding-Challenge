import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import RepoList from "../Componets/RepoList";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const DATE_30_DAYS_BEFORE = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  const apiUrl = `https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${page}`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl);
      const responseData = response.data.items;

      setData((prevData) => [...prevData, ...responseData]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

      if (isScrolledToBottom && !isLoading) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" textAlign="center" m={3}>
          The most starred Github repos that were created in the last 30 days
        </Typography>
        <RepoList repos={data} />
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          {isLoading && <CircularProgress />}
        </Box>
      </Container>
    </>
  );
};

export default Home;
