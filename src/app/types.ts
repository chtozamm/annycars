type Car = {
  id: bigint;
  created_at: Date;
  name: string;
  year: string;
  seller: string;
  link?: string | null;
  advantages?: string | null;
  disadvantages?: string | null;
  image?: string | null;
  price?: string | null;
  mileage?: string | null;
  isSold?: boolean;
};
