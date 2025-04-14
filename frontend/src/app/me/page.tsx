import { UserMovieCard } from "@/components/UserMovieCard";
import UserService from "@/services/UserService";

export default async function MePage() {
  const movies = await UserService.getMovies();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto items-stretch gap-2">
      {movies.map((movie: any) => (
        <UserMovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
