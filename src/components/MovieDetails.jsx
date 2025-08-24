import { useEffect, useState } from "react";
import Loader from "./Loader.jsx";
import StarRating from "./StarRating.jsx";

const key = "760ebded";

export default function MovieDetails({
  selectedId,
  HandleCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, Setmovie] = useState({});
  const [isloading, SetIsLoading] = useState(false);
  const [userRating, SetUserRating] = useState("");

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const WatchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function HandleAdd() {
    const NewWatchMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(NewWatchMovie);
    HandleCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") HandleCloseMovie();
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [HandleCloseMovie]
  );

  useEffect(
    function () {
      async function FetchMovieDetails() {
        SetIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();
        Setmovie(data);
        SetIsLoading(false);
      }
      FetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      const prev = document.title;
      if (!title) return;
      document.title = `Movie | ${title}`;
      return () => {
        document.title = prev;
      };
    },
    [title]
  );

  return (
    <div className="details">
      {!isloading ? (
        <>
          <header>
            <button className="btn-back" onClick={HandleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={SetUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={HandleAdd}>
                      +Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already Rated this Movie {WatchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
