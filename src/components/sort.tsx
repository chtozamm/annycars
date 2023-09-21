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
        <SelectItem value="РОЛЬФ Лахта">РОЛЬФ Лахта</SelectItem>
        <SelectItem value="Автополе Мультикар">Автополе Мультикар</SelectItem>
      </SelectContent>
    </Select>
  );
}
