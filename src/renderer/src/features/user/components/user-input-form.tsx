import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@renderer/components/shadcn/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/shadcn/ui/form';
import { Input } from '@renderer/components/shadcn/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserStore } from '../stores/user-store';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

const UserInputForm = () => {
  const registerUser = useUserStore((state) => state.registerUser);

  // 1. Define a form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  // 2. Define a submit handler.
  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    registerUser(values.username);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="at least 2 characters" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export { UserInputForm };
