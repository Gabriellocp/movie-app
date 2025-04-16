import { UserMovieCard } from "@/components/UserMovieCard";
import { UserMovie } from "@/types";
import { withRetry } from "../actions/withRetry";

export default async function MePage() {
  const movies = await withRetry<UserMovie[]>("/user/movies");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto items-stretch gap-2 p-4">
      {movies.map((movie) => (
        <UserMovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
