import { useEffect, useState } from "react";

import NavBar from "./components/NavBar.jsx";
import Logo from "./components/Logo.jsx";
import Search from "./components/Search.jsx";
import NumResult from "./components/NumResult.jsx";
import Main from "./components/Main.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchMovieList from "./components/WatchMovieList.jsx";

const key = "760ebded";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false); // camelCase
  const [isError, setError] = useState(""); // camelCase
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function HandleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function HandleCloseMovie() {
    setSelectedId(null);
  }

  function HandleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function HandleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function FetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(
              query
            )}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something wrong with fetching the data");
          const data = await res.json();
          if (data.Response === "False") throw new Error("No Movie found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
        setLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      HandleCloseMovie();
      FetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {!loading && !isError && (
            <MovieList movies={movies} onSelectMovie={HandleSelectMovie} />
          )}
          {isError && <ErrorMessage message={isError} />}
          {loading && <Loader />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              HandleCloseMovie={HandleCloseMovie}
              onAddWatched={HandleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatch={HandleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
