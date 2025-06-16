import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt=""
        className="rounded-lg h-52 w-full object-cover
      object-right-bottom cursor-pointer "
      />
      <p className="font-semibold mt-2 truncate">{movie.title}</p>
      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()}.{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join("|")}
        .{timeFormat(movie.runtime)}
      </p>
      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Buy Tickets
        </button>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-2 pr-1">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
