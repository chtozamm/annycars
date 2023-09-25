import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import { EditIcon, PlusSquareIcon } from "@/components/icons";

export const formSchema = z.object({
  name: z.string().nonempty({ message: "Введите название" }),
  year: z.string().length(4, { message: "Выберите год" }),
  // link: z.string().startsWith("https://", { message: "Must provide secure URL" }).url({ message: "Некорректный адрес" }),
  link: z.union([
    z
      .string()
      .startsWith("https://auto.ru")
      .url({ message: "Некорректный адрес" }),
    z
      .string()
      .startsWith("https://avito.ru")
      .url({ message: "Некорректный адрес" }),
  ]),
  image: z.string(),
  price: z.string(),
  mileage: z.string(),
  seller: z.string().nonempty({ message: "Укажите продавца" }),
  advantages: z.string(),
  disadvantages: z.string(),
  isSold: z.boolean(),
});

export function AddCarForm({ handleAdd }: { handleAdd: Function }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: "",
      link: "",
      image: "",
      price: "",
      mileage: "",
      seller: "",
      advantages: "",
      disadvantages: "",
      isSold: false,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleAdd(values);
  }

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step,
    );

  const years = arrayRange(2010, 2016, 1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full items-center gap-1.5" variant="outline">
          <PlusSquareIcon />
          Добавить автомобиль
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen min-w-fit overflow-y-auto sm:max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Добавить автомобиль</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-600 after:content-['*']">
                    Название
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Марка и модель</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-600 after:content-['*']">
                    Год выпуска
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[10rem] overflow-y-auto">
                        {years.map((year: number) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-600 after:content-['*']">
                    Продавец
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Название автосалона</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на объявление</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фото</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пробег</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="advantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Преимущества</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Через запятую</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disadvantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Недостатки</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Через запятую</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <DialogClose
                disabled={
                  !form.getValues().name ||
                  !form.getValues().year ||
                  !form.getValues().seller
                }
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                Добавить
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateCarForm({
  car,
  handleDelete,
  handleUpdate,
}: {
  car: Car;
  handleDelete: Function;
  handleUpdate: Function;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: car.name,
      year: car.year,
      link: car.link || "",
      image: car.image || "",
      price: car.price || "",
      mileage: car.mileage || "",
      seller: car.seller,
      advantages: car.advantages || "",
      disadvantages: car.disadvantages || "",
      isSold: car.isSold,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleUpdate(car.id, values);
  }

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step,
    );

  const years = arrayRange(2010, 2016, 1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-fit items-center gap-1.5 text-gray-300"
          variant="ghost"
        >
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen min-w-fit overflow-y-auto sm:max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Изменить данные</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Марка и модель</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Год выпуска</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[10rem] overflow-y-auto">
                        {years.map((year: number) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Продавец</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Название автосалона</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на объявление</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фото</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пробег</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="advantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Преимущества</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Через запятую</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disadvantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Недостатки</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>Через запятую</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSold"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <div className="flex gap-1.5">
                      <Input
                        autoComplete="off"
                        id="is-sold"
                        className="w-fit accent-black"
                        type="checkbox"
                        defaultChecked={car.isSold}
                        onChange={field.onChange}
                      />
                      <Label htmlFor="is-sold">Автомобиль продан</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Удалить</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Вы уверены, что хотите удалить объявление?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {car.name}, {car.year}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <DialogClose
                      onClick={() => handleDelete(car)}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                    >
                      Удалить
                    </DialogClose>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <DialogClose
                disabled={
                  !form.getValues().name ||
                  !form.getValues().year ||
                  !form.getValues().seller
                }
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                Сохранить
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
