import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";

const API_KEY = "feb938e4";

const MovieCard = ({ movie }) => {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
      );
      setDetails(response.data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={movie.Poster} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Year}</Card.Text>
          <Button variant="info" onClick={fetchMovieDetails}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for Movie Details */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{details?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Year:</strong> {details?.Year}</p>
          <p><strong>Actors:</strong> {details?.Actors}</p>
          <p><strong>Plot:</strong> {details?.Plot}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieCard;
