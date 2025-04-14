"use client";
import { UserMovie } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { MovieModal } from "../MovieModal";
interface IUserMovieCardProps {
  movie: UserMovie;
}
export function UserMovieCard({ movie }: IUserMovieCardProps) {
  const [currentMovie, setCurrentMovie] = useState<UserMovie>(movie);
  const movieWatched = currentMovie.status === "WATCHED";
  return (
    <div className="w-full rounded-md flex flex-1 flex-col justify-between space-y-2">
      <div className="flex space-x-2 flex-1">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="rounded-xl flex-0 min-w-25"
          width={150}
          height={100}
          alt={movie.original_title}
        />
        <div
          className={`flex flex-col space-y-2 flex-1 items-start ${
            movieWatched ? "justify-around" : "justify-start"
          }`}
        >
          <strong className="text-primary text-center">{movie.title}</strong>
          {movieWatched ? (
            <>
              <div>
                <strong className="text-primary">My overview</strong>
                <p className="overflow-ellipsis text-cente">
                  {currentMovie.annotation}
                </p>
              </div>
              <div>
                <strong className="text-primary">{`Rate ${currentMovie.rate}/5`}</strong>
              </div>
            </>
          ) : (
            <strong className="text-red-700">
              You have not watched this movie yet
            </strong>
          )}
        </div>
      </div>
      <MovieModal
        mode="update"
        movie={currentMovie}
        onSave={(newMovie) =>
          setCurrentMovie((prev) => ({
            ...prev,
            ...newMovie,
          }))
        }
      />
    </div>
  );
}
