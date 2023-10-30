import React, { useEffect, useState } from "react";
import Auth1 from "./components/Auth1.js";
import { db,auth } from "./config/firebase-config.js";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setReleaseDate] = useState("");
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  // function is responsible for fetching movie data from Firestore
  const getMovieList = async () => { 
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id); // Make sure "movies" is the correct collection name
      await deleteDoc(movieDoc);
      const updatedMovies = movieList.filter((movie) => movie.id !== id);
      setMovieList(updatedMovies);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });

      // Update the movieList state to reflect the updated title
      setMovieList((prevMovieList) =>
        prevMovieList.map((movie) => {
          if (movie.id === id) {
            return { ...movie, title: updatedTitle };
          }
          return movie;
        })
      );
    } catch (error) {
      console.error("Error updating movie title:", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  async function onSubmit() {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        date: newReleaseDate,
        recievedanOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error("submit error",err);
    }
  }
  return (
    <div className="App">
      <Auth1 />
      <div>
        <div className="inputs">
          <input
            placeholder="Movie Title..."
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            placeholder="release Date..."
            type="number"
            onChange={(e) => setReleaseDate(Number(e.target.value))}
          />
          <input
            type="checkbox"
            checked={newMovieOscar}
            onChange={(e) => setNewMovieOscar(e.target.checked)}
          />
          <label> Recieved An Oscar</label>
          <button onClick={onSubmit}>Submit Movies</button>
        </div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.recievedanOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.date}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              placeholder="newTitle..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
