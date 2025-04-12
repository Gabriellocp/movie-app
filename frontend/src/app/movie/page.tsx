"use client";
import { MovieList } from "@/components/MovieList";
import { Input } from "@/components/ui/input";
import MovieService from "@/services/MovieService";
import debounce from "debounce";
import { useEffect, useMemo, useState } from "react";
export default function MoviePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<{
    page: number;
    results: [];
    total_pages: number;
    total_results?: number;
  }>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: undefined,
  });
  const handleSearch = async (page?: number) => {
    try {
      setLoading(true);
      const response = await MovieService.search(searchTerm, page ?? 1);
      setMovies((prev) => ({ ...prev, ...(response as any) }));
    } catch {
    } finally {
      setLoading(false);
    }
  };
  const handleDebounceSeach = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );
  useEffect(() => {
    handleDebounceSeach(1);
    return () => {
      handleDebounceSeach.clear();
    };
  }, [searchTerm]);
  return (
    <div className="flex flex-col flex-1 min-h-0 mx-auto sm:w-1/2 space-y-4">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-16 text-primary font-bold !text-4xl input align-top"
        placeholder="Search for a movie..."
      />
      <MovieList
        loading={loading}
        movies={movies.results}
        onChange={handleSearch}
        page={movies.page}
        totalMovies={movies.total_results}
        totalPages={movies.total_pages}
      />
    </div>
  );
}
