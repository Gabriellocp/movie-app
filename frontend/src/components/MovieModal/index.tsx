"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MovieService from "@/services/MovieService";
import UserService from "@/services/UserService";
import { MovieApi, MovieDb, UserMovie } from "@/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { MovieForm } from "../Form/Movie";
import { Button } from "../ui/button";

interface ICreateMovieModal {
  mode: "create";
  movie: MovieDb;
  onSave?: never;
}
interface IUpdateMovieModal {
  mode: "update";
  movie: UserMovie;
  onSave?: (movie: MovieApi) => void | Promise<void>;
}

type MovieModalProps = ICreateMovieModal | IUpdateMovieModal;
export function MovieModal({ mode, movie, onSave }: MovieModalProps) {
  const [movieData, setMovieData] = useState<MovieDb | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const fetch = async () => {
    if (mode === "update") {
      return;
    }
    try {
      setOpen(true);
      const response = await MovieService.details(String(movie.id));
      setMovieData(response);
    } catch {
      toast("Could not get movie details");
      setOpen(false);
    }
  };
  const isEditMode = mode === "update";
  const handleSubmit = async (values: any) => {
    try {
      if (!isEditMode) {
        await UserService.addMovie({
          ...values,
          externalId: movieData?.id,
          categories: movieData?.genres.map((genre) => genre.name),
        });
        toast("Movie added successfully!");
      } else {
        const updated = await UserService.updateMovie(movie.id, values);
        await onSave?.(updated);
      }
      setOpen(false);
    } catch (error: any) {
      toast(error.message);
      throw error;
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={fetch} className="w-20" asChild>
        <Button>{`${isEditMode ? "Edit" : "Add"}`}</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {`${
              isEditMode ? `Editing "${movie.title}"` : `Add "${movie.title}"?`
            }`}
          </DialogTitle>
          <hr></hr>
          <MovieForm data={movie} onSubmit={handleSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
