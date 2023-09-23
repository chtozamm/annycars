type Car = {
  id: bigint;
  created_at: Date;
  name: string;
  year: string;
  seller: string;
  link?: string | undefined;
  advantages?: string | undefined;
  disadvantages?: string | undefined;
  image?: string | undefined;
  price?: string | undefined;
  mileage?: string | undefined;
  isSold?: boolean;
};
