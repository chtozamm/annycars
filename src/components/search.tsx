import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <Input
      type="text"
      placeholder="Поиск по названию"
      className="w-full max-w-md"
    />
  );
}
