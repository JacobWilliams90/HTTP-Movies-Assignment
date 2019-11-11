import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  margin: 0 auto;
`;

const MovieUpdate = props => {
  console.log(props);
  const [movie, setMovie] = useState(null);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleStar = index => e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  const addStar = event => {
    event.preventDefault();
    setMovie({ ...movie, stars: [...movie.stars, ""] });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Form onSubmit={handleSubmit} className="updateWrapper">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
        className="spacer"
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={movie.director}
        onChange={handleChange} className='spacer'
      />
      <input
        type="text"
        name="metascore"
        placeholder="Metascore"
        value={movie.metascore}
        onChange={handleChange}
        className='spacer'
      />
      {movie.stars.map((starName, index) => {
        return (
          <input
            type="text"
            placeholder="Star"
            value={starName}
            key={index}
            onChange={handleStar(index)}
            className='spacer'
          />
        );
      })}
      <button onClick={addStar} className='spacer'>Add Star</button>
      <button type="submit" className='spacer'>Update Movie</button>
    </Form>
  );
};

export default MovieUpdate;
