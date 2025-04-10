import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface IFormInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  className?: string;
  inputClassname?: string;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  className,
  inputClassname,
}: IFormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={inputClassname}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
