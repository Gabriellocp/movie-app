"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "debounce";
import { Pencil, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../Form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
interface ICreate {
  mode: "create";
  initialValue?: string;
  onSubmit: (data: FormData) => Promise<void>;
}
interface IUpdate {
  mode: "update";
  initialValue?: string;
  onSubmit: (name: string) => void | Promise<void>;
}
type FolderModalProps = ICreate | IUpdate;
export function FolderModal({
  mode,
  onSubmit,
  initialValue,
}: FolderModalProps) {
  const schema = z.object({
    name: z.string().min(3, "Name is required with a min 3 characters"),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: initialValue ?? "" },
  });
  const handleSubmit = async (values: typeof schema._type) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (mode === "create") {
      await onSubmit(formData);
    } else {
      await onSubmit(values.name);
    }
  };
  useEffect(() => {
    if (initialValue) {
      form.setValue("name", initialValue);
    }
  }, [initialValue, form]);
  const handleChange = debounce(handleSubmit, 500);

  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        {mode === "update" ? (
          <Pencil />
        ) : (
          <Button variant={"secondary"}>
            <Plus></Plus> Folder
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogTitle>{`${
          mode === "create" ? "Choose a name" : "Rename folder"
        }`}</DialogTitle>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4"
            {...(mode === "create"
              ? {
                  onSubmit: form.handleSubmit(handleSubmit),
                }
              : { onChange: form.handleSubmit(handleChange) })}
          >
            <FormInput control={form.control} name="name"></FormInput>
            {mode === "create" && <Button type="submit">Create</Button>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
