"use client";
import { Form } from "@/components/ui/form";
import FolderService from "@/services/FolderService";
import UserService from "@/services/UserService";
import { MOVIE_STATUS } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormInput } from "./Input";
import FormSelect from "./Select";
import { FormTextArea } from "./TextArea";
export function MovieForm({
  data,
  update,
  onSubmit,
}: {
  data: any;
  update?: boolean;
  onSubmit?: (values: any) => void;
}) {
  const [userFolders, setUserFolders] = useState<
    { id: string; name: string }[]
  >([]);
  const schema = z.object({
    status: z.enum([MOVIE_STATUS.WATCHED, MOVIE_STATUS.WATCH_LATER]),
    rate: z.coerce.number().max(5),
    annotation: z.string(),
    folderId: z.string().min(1, "Folder is required"),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: MOVIE_STATUS.WATCHED,
      rate: 0,
      annotation: "",
      folderId: "",
    },
  });
  const handleSubmit = async (values: any) => {
    try {
      await UserService.addMovie({
        ...values,
        externalId: data.id,
        categories: data.genres.map(
          (x: { name: string; id: number }) => x.name
        ),
      });
      toast("Movie added successfully!");
      form.reset();
      onSubmit?.(values);
    } catch (error: any) {
      toast(error.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await FolderService.getUserFolders();
        setUserFolders(response);
      } catch (err) {
        console.log("BUSCANDO FOLDERS", err);
      }
    };
    fetch();
  }, []);
  return (
    <Form {...form}>
      <form
        className="bg-white p-8 rounded-xl flex flex-col space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInput
          control={form.control}
          name={"rate"}
          label={"Rate"}
          type="number"
        />
        <FormSelect
          control={form.control}
          name={"status"}
          label={"Status"}
          values={[
            { label: "WATCHED", value: MOVIE_STATUS.WATCHED },
            { label: "WATCH LATER", value: MOVIE_STATUS.WATCH_LATER },
          ]}
        />
        <FormTextArea
          control={form.control}
          name={"annotation"}
          label={"Annotation"}
        />
        <FormSelect
          control={form.control}
          name={"folderId"}
          label={"Folder"}
          placeholder="Select a folder"
          values={userFolders.map((x) => ({
            label: x.name,
            value: x.id,
          }))}
        />

        <Button type="submit">Add movie</Button>
      </form>
    </Form>
  );
}
