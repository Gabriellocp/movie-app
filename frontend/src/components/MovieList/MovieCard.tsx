import Image from "next/image";
import { ReactNode } from "react";

interface IMovieCardProps {
  movie: any;
  children?: ReactNode;
}
export function MovieCard({ movie, children }: IMovieCardProps) {
  return (
    <div className="h-50 w-full rounded-md bg-white overflow-hidden flex">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        width={150}
        height={100}
        alt={movie.original_title}
      />
      <div className="flex flex-1 p-6 text-primary flex-col space-y-4 min-h-0">
        <h2 className="font-bold">{`${movie.title} (${movie.original_title})`}</h2>
        <p className="text-sm flex flex-1 overflow-y-auto min-h-0">
          {movie.overview}
        </p>
        {children}
      </div>
    </div>
  );
}
