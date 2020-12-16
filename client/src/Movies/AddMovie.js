import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};
export default function AddMovie(props) {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);

  const changeHandler = (e) => {
      setItem({
        ...item,
        [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, item)
      .then((res) => {
        console.log(res.data);
        props.setMovieList(res.data);
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
    // make a PUT request to edit the item
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="string"
          name="title"
          onChange={changeHandler}
          placeholder="Movie Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Starring Actors"
          value={"Brad Pitt"}
        />
        <div className="baseline" />

        <button className="add-button">Add</button>
      </form>
    </div>
  );
}
