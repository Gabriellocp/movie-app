"use client";
import { Form } from "@/components/ui/form";
import FolderService from "@/services/FolderService";
import { MOVIE_STATUS } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormInput } from "./Input";
import FormSelect from "./Select";
import { FormTextArea } from "./TextArea";
export function MovieForm({
  data,
  onSubmit,
}: {
  data: any;
  onSubmit?: (values: any) => Promise<void>;
}) {
  const [userFolders, setUserFolders] = useState<
    { id: string; name: string }[]
  >([]);
  const schema = z
    .object({
      status: z.enum([MOVIE_STATUS.WATCHED, MOVIE_STATUS.WATCH_LATER]),
      rate: z.coerce.number(),
      annotation: z.string(),
      folderId: z.string().min(1, "Folder is required"),
    })
    .superRefine((data, ctx) => {
      if (data.status === MOVIE_STATUS.WATCHED && data.rate > 5) {
        ctx.addIssue({
          message: "Must be less than or equal to 5",
          path: ["rate"],
          code: "custom",
        });
      }
    });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status:
        MOVIE_STATUS[
          (data?.status ?? MOVIE_STATUS.WATCHED) as keyof typeof MOVIE_STATUS
        ],
      rate: data?.rate ?? 0,
      annotation: data?.annotation ?? "",
      folderId: data?.folderId ?? "",
    },
  });
  const handleSubmit = async (values: any) => {
    try {
      await onSubmit?.(values);
      form.reset();
    } catch (error: any) {}
  };
  const alreadyWatchedMovie = form.watch("status") === MOVIE_STATUS.WATCHED;
  useEffect(() => {
    if (!alreadyWatchedMovie) {
      form.resetField("annotation");
      form.resetField("rate");
    }
  }, [alreadyWatchedMovie]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await FolderService.getUserFolders();
        setUserFolders(response);
      } catch (err) {}
    };
    fetch();
  }, []);
  return (
    <Form {...form}>
      <form
        className="bg-white p-8 rounded-xl flex flex-col space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormSelect
          control={form.control}
          name={"status"}
          label={"Status"}
          values={[
            { label: "WATCHED", value: MOVIE_STATUS.WATCHED },
            { label: "WATCH LATER", value: MOVIE_STATUS.WATCH_LATER },
          ]}
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
        {alreadyWatchedMovie && (
          <>
            <FormInput
              control={form.control}
              name={"rate"}
              label={"Rate"}
              type="number"
            />
            <FormTextArea
              control={form.control}
              name={"annotation"}
              label={"Annotation"}
            />
          </>
        )}

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
