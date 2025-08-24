import Movie from "./Movie.jsx";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie, idx) => (
        <Movie
          movie={movie}
          key={`${movie.imdbID}-${idx}`}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
