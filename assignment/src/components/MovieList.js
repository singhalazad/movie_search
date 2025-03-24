import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <Row>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Col key={movie.imdbID} md={4} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))
      ) : (
        <h5 className="text-center w-100">No movies found!</h5>
      )}
    </Row>
  );
};

export default MovieList;
