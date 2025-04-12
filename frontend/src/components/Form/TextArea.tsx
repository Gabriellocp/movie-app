import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
interface IFormTextAreaProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassname?: string;
}

export function FormTextArea({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  inputClassname,
}: IFormTextAreaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              className={inputClassname}
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
