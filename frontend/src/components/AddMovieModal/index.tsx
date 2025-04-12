import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MovieService from "@/services/MovieService";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { MovieForm } from "../Form/Movie";

export function AddMovieModal({ movie }: { movie: any }) {
  const [movieData, setMovieData] = useState(undefined);
  const fetch = async () => {
    try {
      const response = await MovieService.details(movie.id);
      setMovieData(response);
    } catch {}
  };

  return (
    <Dialog>
      <DialogTrigger onClick={fetch} className="w-20">
        Add +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add "{movie.title}"?</DialogTitle>
          <MovieForm data={movieData} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
