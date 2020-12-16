import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("", res.data);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (ev) => {
    setItem({
      ...item,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        console.log(res.data);
        axios
          .get("http://localhost:5000/api/movies")
          .then((res) => {
            props.setMovieList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
    // make a PUT request to edit the item
  };

  return (
    <div>
      <h2>Update Movie</h2>
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
          value={item.stars}
        />
        <div className="baseline" />

        <button className="add-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
