import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/provider/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormInput } from "./Input";
export function SignInForm() {
  const { login } = useAuthContext();
  const router = useRouter();
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must have 8 characters"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: any) => {
    const { success, message } = await login(values);
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
        <FormInput control={form.control} name={"email"} label={"Email"} />
        <FormInput
          control={form.control}
          name={"password"}
          label={"Password"}
          type="password"
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
