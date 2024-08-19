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
import { useUserStore } from '@renderer/features/user/stores/user-store';
import { showToastError } from '@renderer/utils/toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTodoStore } from '../stores/todo-store';
import { useTodoTyoeStore } from '../stores/todo-type-store';
import { TodoTypeSelect } from './todo-type-select';

const formSchema = z.object({
  content: z.string().min(1),
  deadline: z.string()
  // NOTE: statusは初期値0とするためSchemaには不要
  // status: z.union([z.literal(0), z.literal(1)])
});

export const TodoInputForm = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const selectedTodoType = useTodoTyoeStore((state) => state.selectedTodoType);
  const addTodo = useTodoStore((state) => state.addTodo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      deadline: ''
    }
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    if (!selectedUser) {
      showToastError('ユーザーが選択されていません');
      return;
    }

    if (!selectedTodoType) {
      showToastError('TodoTypeが選択されていません');
      return;
    }

    addTodo({
      content: values.content,
      deadline: values.deadline === '' ? null : new Date(values.deadline),
      status: 0,
      userId: selectedUser.id,
      todoType: {
        id: selectedTodoType.id,
        name: selectedTodoType.name,
        sortOrder: selectedTodoType.sortOrder
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-14">Content</FormLabel>
                <FormControl className="w-48">
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>This is your todo content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-14">Deadline</FormLabel>
                <FormControl className="w-48">
                  <Input placeholder="" {...field} type="date" />
                </FormControl>
                <FormDescription>This is your todo deadline.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TodoTypeSelect />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
