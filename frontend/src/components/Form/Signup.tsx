import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/provider/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormInput } from "./Input";
export function SignUpForm() {
  const { register } = useAuthContext();
  const router = useRouter();
  const schema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must have 8 characters"),
      passwordConfirmation: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords must match",
          path: ["passwordConfirmation"],
        });
      }
    })
    .transform((data) => {
      const { passwordConfirmation, ...rest } = data;
      return {
        ...rest,
      };
    });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const handleSubmit = async (values: any) => {
    const { success, message } = await register(values);
    if (message) {
      toast(message);
    }
    if (success) {
      form.reset();
      router.push("/movie");
    }
  };
  return (
    <Form {...form}>
      <form
        className="bg-white p-8 rounded-xl flex flex-col space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInput control={form.control} name={"name"} label={"Name"} />
        <FormInput control={form.control} name={"email"} label={"Email"} />
        <FormInput
          control={form.control}
          name={"password"}
          label={"Password"}
          type="password"
        />
        <FormInput
          control={form.control}
          name={"passwordConfirmation"}
          label={"Password confirmation"}
          type="password"
        />
        <Button type="submit">Create account</Button>
      </form>
    </Form>
  );
}
