import { MovieDb } from "@/types";
import { MovieModal } from "../MovieModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Spinner } from "../ui/spinner";
import { MovieCard } from "./MovieCard";

interface IMovieListProps {
  movies: MovieDb[];
  page: number;
  totalPages: number;
  totalMovies?: number;
  onChange: (page: number) => Promise<any>;
  loading: boolean;
}
export function MovieList({
  loading,
  movies,
  onChange,
  page,
  totalMovies,
  totalPages,
}: IMovieListProps) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size={"large"}>Searching...</Spinner>
      </div>
    );
  }
  if (totalMovies === 0) {
    return (
      <h1 className="flex items-center flex-1 justify-center text-4xl text-primary">
        Nothing to show... :(
      </h1>
    );
  }
  if (movies.length === 0) {
    return null;
  }
  return (
    <div className="bg-primary flex flex-1 min-h-0 flex-col rounded-md shadow-2xl shadow-white p-4">
      <div className="space-y-4 flex-1 min-h-0 overflow-y-auto">
        {movies.map((movie) => {
          return (
            <MovieCard key={movie.id} movie={movie}>
              <MovieModal movie={movie} mode="create" />
            </MovieCard>
          );
        })}
      </div>
      <Pagination className="flex align-bottom flex-col justify-center items-center space-y-2">
        <span className="text-white">{`Page ${page} of ${totalPages} - ${totalMovies} found`}</span>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onChange(page - 1)}
                className="bg-white"
              />
            </PaginationItem>
          )}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onChange(page + 1)}
                className="bg-white"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
