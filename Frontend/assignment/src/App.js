import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";

const API_KEY = "feb938e4";
const DEFAULT_SEARCH = "Avengers"; // Default search keyword

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setMovies([]);
        setError(response.data.Error || "No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Fetch default movies when the component mounts
  useEffect(() => {
    fetchMovies(DEFAULT_SEARCH);
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">🎬 Movie Search</h1>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <Form.Control
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchMovies(search)}
          className="w-50"
        />
        <Button variant="primary" onClick={() => fetchMovies(search)}>
          Search
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <MovieList movies={movies} />
      )}
    </Container>
  );
}

export default App;
