import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().nonempty({ message: "Введите название" }),
  year: z.string().length(4, { message: "Выберите год" }),
  link: z.string(),
  image: z.string(),
  price: z.string(),
  mileage: z.string(),
  seller: z.string().nonempty({ message: "Укажите продавца" }),
  advantages: z.string(),
  disadvantages: z.string(),
  isSold: z.boolean(),
});
