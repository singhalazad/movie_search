import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetail({ movie, setSelectedMovie }) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/movie?id=${movie.imdbID}`)
            .then(response => setDetails(response.data));
    }, [movie]);

    return (
        <div>
            <button onClick={() => setSelectedMovie(null)}>Back</button>
            {details ? (
                <div>
                    <h2>{details.Title} ({details.Year})</h2>
                    <img src={details.Poster} alt={details.Title} width="200" />
                    <p><strong>Plot:</strong> {details.Plot}</p>
                    <p><strong>Actors:</strong> {details.Actors}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MovieDetail;