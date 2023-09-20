import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sort() {
  return (
    <Select>
      <SelectTrigger className="mt-3 w-full max-w-md">
        <SelectValue placeholder="Сортировать по компании" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rolf-lahta">РОЛЬФ Лахта</SelectItem>
      </SelectContent>
    </Select>
  );
}
