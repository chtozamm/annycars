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
import {
  EditIcon,
  MinusIcon,
  PlusIcon,
  PlusSquareIcon,
} from "@/components/icons";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import ExternalLink from "@/components/externalLink";
import Image from "next/image";

export const formSchema = z.object({
  name: z.string().nonempty({ message: "Введите название" }),
  year: z.string().length(4, { message: "Выберите год" }),
  link: z.union([z.literal(""), z.string().trim().url()]),
  image: z.union([z.literal(""), z.string().trim().url()]),
  price: z.string(),
  mileage: z.string(),
  seller: z.string().nonempty({ message: "Укажите продавца" }),
  advantages: z.string(),
  disadvantages: z.string(),
  isSold: z.boolean(),
});

function StepUpdate({
  step,
  currentStep,
  setCurrentStep,
}: {
  step: number;
  currentStep: number;
  setCurrentStep: Function;
}) {
  let status = currentStep === step ? "complete" : "inactive";
  return (
    <motion.div
      animate={status}
      className="h-fit w-fit active:rounded-full"
      onClick={() => setCurrentStep(step)}
    >
      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#fff", // neutral
            borderColor: "#e5e5e5", // neutral-200
            color: "#a3a3a3", // neutral-400
          },
          active: {
            backgroundColor: "#fff",
            borderColor: "#000",
            color: "#000",
          },
          complete: {
            backgroundColor: "#000",
            borderColor: "#000",
            color: "#000",
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <span className="text-white">{step}</span>
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";
  return (
    <motion.div animate={status} className="h-fit w-fit">
      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#fff", // neutral
            borderColor: "#e5e5e5", // neutral-200
            color: "#a3a3a3", // neutral-400
          },
          active: {
            backgroundColor: "#fff",
            borderColor: "#000",
            color: "#000",
          },
          complete: {
            backgroundColor: "#000",
            borderColor: "#000",
            color: "#000",
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AddCarForm({ handleAdd }: { handleAdd: Function }) {
  // Multistep Wizard
  let [step, setStep] = useState(1);

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
      <DialogContent className="mx-auto flex h-screen max-h-screen w-full min-w-fit max-w-md flex-col justify-start overflow-y-auto rounded-lg bg-white shadow-xl sm:h-fit sm:max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Добавить автомобиль</DialogTitle>
        </DialogHeader>
        <div className="flex h-fit justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
          <Step step={5} currentStep={step} />
        </div>
        <div className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className={`${step === 1 ? "flex flex-col gap-3" : "hidden"}`}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:text-red-600 after:content-['*']">
                        Название
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Марка и модель"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
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
              </div>
              <div
                className={`${step === 2 ? "flex flex-col gap-3" : "hidden"}`}
              >
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
              </div>
              <div
                className={`${step === 3 ? "flex flex-col gap-3" : "hidden"}`}
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цена</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormDescription>В формате 123 456</FormDescription>
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
                      <FormDescription>В формате 123 456</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`${step === 4 ? "flex flex-col gap-3" : "hidden"}`}
              >
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
              </div>
              <div
                className={`${
                  step === 5 ? "flex flex-col justify-end gap-3" : "hidden"
                }`}
              >
                <div
                  className={`${
                    form.getValues().image
                      ? ""
                      : "bg-gradient bg-gradient-to-b from-gray-50 to-gray-100"
                  } relative aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm`}
                >
                  {form.getValues().image && (
                    <Image
                      src={form.getValues().image}
                      fill
                      sizes="384px"
                      className={`${
                        form.getValues().isSold
                          ? "brightness-90 saturate-0"
                          : ""
                      } object-cover transition-all duration-700 ease-in-out
                    `}
                      alt=""
                    />
                  )}
                </div>
                <p
                  className={`${
                    form.getValues().isSold ? "line-through" : ""
                  } mt-3 flex items-center justify-between text-xl font-semibold`}
                >
                  {form.getValues().name}, {form.getValues().year}
                </p>
                <p className="w-full border-b pb-1"></p>
                <p className="mt-1.5 flex items-center justify-between text-lg">
                  {form.getValues().price &&
                    (isNaN(+form.getValues().price.replace(" ", ""))
                      ? form.getValues().price
                      : form.getValues().price + " ₽")}
                  {form.getValues().mileage && (
                    <span className="ml-auto text-sm text-gray-600">
                      {form.getValues().mileage} км
                    </span>
                  )}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-6 text-sm">
                  {form.getValues().advantages && (
                    <div>
                      <span className="text-base font-medium">
                        Преимущества
                      </span>
                      <p className="flex flex-col">
                        {form.getValues().advantages &&
                          form
                            .getValues()
                            .advantages.split(",")
                            .map((item: string) => (
                              <span key={item} className="flex gap-1.5">
                                <PlusIcon />
                                {item.trim()}
                              </span>
                            ))}
                      </p>
                    </div>
                  )}
                  {form.getValues().disadvantages && (
                    <div>
                      <span className="text-base font-medium">Недостатки</span>
                      <p className="flex flex-col">
                        {form.getValues().disadvantages &&
                          form
                            .getValues()
                            .disadvantages.split(",")
                            .map((item: string) => (
                              <span key={item} className="flex gap-1.5">
                                <MinusIcon />
                                {item.trim()}
                              </span>
                            ))}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between pt-6">
                  {form.getValues().seller && (
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
                      {form.getValues().seller}
                    </span>
                  )}
                  {form.getValues().link && (
                    <span className="ml-auto">
                      <ExternalLink url={form.getValues().link} />
                    </span>
                  )}
                </div>
                <DialogClose
                  type="submit"
                  className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                >
                  Добавить
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
        <div className="px-8">
          <div className={`${step === 5 ? "" : "mt-10 flex justify-between"}`}>
            <Button
              variant={"outline"}
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className={`${
                step === 1 ? "pointer-events-none opacity-50" : ""
              } ${step === 5 ? "w-full" : ""}
              `}
            >
              {/* duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700 */}
              Назад
            </Button>
            <Button
              disabled={
                step === 1
                  ? !form.getValues().name || !form.getValues().year
                  : !form.getValues().seller
              }
              onClick={() => setStep(step > 4 ? step : step + 1)}
              className={`${step > 4 ? "hidden" : ""}`}
            >
              Продолжить
            </Button>
          </div>
        </div>
        {/* 
          </form>
        </Form> */}
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

  // Multistep Wizard
  let [step, setStep] = useState(5);

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
      <DialogContent className="mx-auto flex h-screen max-h-screen w-full min-w-fit max-w-md flex-col justify-start overflow-y-auto rounded-lg bg-white shadow-xl sm:h-fit sm:max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Изменить данные</DialogTitle>
        </DialogHeader>
        <div className="flex h-fit justify-between rounded px-8 py-3 sm:py-8">
          <StepUpdate step={1} currentStep={step} setCurrentStep={setStep} />
          <StepUpdate step={2} currentStep={step} setCurrentStep={setStep} />
          <StepUpdate step={3} currentStep={step} setCurrentStep={setStep} />
          <StepUpdate step={4} currentStep={step} setCurrentStep={setStep} />
          <StepUpdate step={5} currentStep={step} setCurrentStep={setStep} />
        </div>
        <div className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className={`${step === 1 ? "flex flex-col gap-3" : "hidden"}`}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:text-red-600 after:content-['*']">
                        Название
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Марка и модель"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
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
              </div>
              <div
                className={`${step === 2 ? "flex flex-col gap-3" : "hidden"}`}
              >
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
                      {form.formState.errors?.image?.message && (
                        <p>{form.formState.errors.image.message}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`${step === 3 ? "flex flex-col gap-3" : "hidden"}`}
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цена</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormDescription>В формате 123 456</FormDescription>
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
                      <FormDescription>В формате 123 456</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`${step === 4 ? "flex flex-col gap-3" : "hidden"}`}
              >
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
                    <FormItem className="mt-6 flex flex-row items-center gap-3">
                      <FormControl>
                        <div className="flex gap-1.5">
                          <Input
                            autoComplete="off"
                            id="is-sold"
                            className="w-fit accent-black"
                            type="checkbox"
                            defaultChecked={form.getValues().isSold}
                            onChange={field.onChange}
                          />
                          <Label htmlFor="is-sold">Автомобиль продан</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`${
                  step === 5 ? "flex flex-col justify-end gap-3" : "hidden"
                }`}
              >
                <div
                  className={`${
                    form.getValues().image
                      ? ""
                      : "bg-gradient bg-gradient-to-b from-gray-50 to-gray-100"
                  } relative aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm`}
                >
                  {form.getValues().image && (
                    <Image
                      src={form.getValues().image}
                      fill
                      sizes="384px"
                      className={`${
                        form.getValues().isSold
                          ? "brightness-90 saturate-0"
                          : ""
                      } object-cover transition-all duration-700 ease-in-out
                    `}
                      alt=""
                    />
                  )}
                </div>
                <p
                  className={`${
                    form.getValues().isSold ? "line-through" : ""
                  } mt-3 flex items-center justify-between text-xl font-semibold`}
                >
                  {form.getValues().name}, {form.getValues().year}
                </p>
                <p className="w-full border-b pb-1"></p>
                <p className="mt-1.5 flex items-center justify-between text-lg">
                  {form.getValues().price &&
                    (isNaN(+form.getValues().price.replace(" ", ""))
                      ? form.getValues().price
                      : form.getValues().price + " ₽")}
                  {form.getValues().mileage && (
                    <span className="ml-auto text-sm text-gray-600">
                      {form.getValues().mileage} км
                    </span>
                  )}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-6 text-sm">
                  {form.getValues().advantages && (
                    <div>
                      <span className="text-base font-medium">
                        Преимущества
                      </span>
                      <p className="flex flex-col">
                        {form.getValues().advantages &&
                          form
                            .getValues()
                            .advantages.split(",")
                            .map((item: string) => (
                              <span key={item} className="flex gap-1.5">
                                <PlusIcon />
                                {item.trim()}
                              </span>
                            ))}
                      </p>
                    </div>
                  )}
                  {form.getValues().disadvantages && (
                    <div>
                      <span className="text-base font-medium">Недостатки</span>
                      <p className="flex flex-col">
                        {form.getValues().disadvantages &&
                          form
                            .getValues()
                            .disadvantages.split(",")
                            .map((item: string) => (
                              <span key={item} className="flex gap-1.5">
                                <MinusIcon />
                                {item.trim()}
                              </span>
                            ))}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between pt-6">
                  {form.getValues().seller && (
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
                      {form.getValues().seller}
                    </span>
                  )}
                  {form.getValues().link && (
                    <span className="ml-auto">
                      <ExternalLink url={form.getValues().link} />
                    </span>
                  )}
                </div>
                <div
                  className={`${
                    step === 5 ? "flex flex-col items-center gap-3" : "hidden"
                  }`}
                >
                  <DialogClose
                    type="submit"
                    className="mt-8 flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                  >
                    Сохранить
                  </DialogClose>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Удалить
                      </Button>
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
                        <Button
                          onClick={() => handleDelete(car)}
                          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300 sm:w-fit"
                        >
                          Удалить
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div
          className={`${
            step === 5 ? "hidden" : "mx-8 mt-10 flex justify-between"
          }`}
        >
          <Button
            variant={"outline"}
            onClick={() => setStep(step < 2 ? step : step - 1)}
            className={`${step === 1 ? "pointer-events-none opacity-50" : ""} ${
              step === 5 ? "w-full" : ""
            }
              `}
          >
            Назад
          </Button>
          <Button
            disabled={
              step === 1
                ? !form.getValues().name || !form.getValues().year
                : !form.getValues().seller
            }
            onClick={() => setStep(step > 4 ? step : step + 1)}
            className={`${step > 4 ? "hidden" : ""}`}
          >
            Продолжить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
