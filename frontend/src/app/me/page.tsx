import { MovieCard } from "@/components/MovieList/MovieCard";
import UserService from "@/services/UserService";

export default async function MePage() {
  const movies = await UserService.getMovies();
  return (
    <div className="flex w-auto flex-col space-y-2 items-center mx-auto sm:w-1/2">
      {movies.map((movie: any) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
