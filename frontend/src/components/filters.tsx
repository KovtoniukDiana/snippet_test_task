import { Input, Select, SelectItem} from "@heroui/react";

type IProps = {
  search: string;
  tag: string;
  onSearchChange: (value: string) => void;
  onTagChange: (value: string) => void;
};

export default function Filters({search, tag, onSearchChange, onTagChange} : IProps) {

    const hasFilters = search.length > 0 || tag.length > 0;

    const handleReset = () => {
        onSearchChange("");
        onTagChange("");
    };

  return (
    <div className="flex gap-7 mb-6">

      <Input
        placeholder="Шукати сніпети..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        isClearable
        onClear={() => onSearchChange("")}
      />

      <Select
        placeholder="Фільтрувати за тегом"
        selectedKeys={tag ? [tag] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          onTagChange(value);
        }}
        classNames={{
            label: "text-default-500 pb-2",
            trigger: "border-gray-100",
            popoverContent: "border border-gray-100",
        }}
      >
        <SelectItem key="react">react</SelectItem>
        <SelectItem key="nestjs">nestjs</SelectItem>
        <SelectItem key="typescript">typescript</SelectItem>
      </Select>

        <button 
        color="danger" 
        onClick={handleReset}
        className="whitespace-nowrap min-w-fit border border-black rounded-lg p-2"
        >
            Скинути фільтри
        </button>

    </div>
  )
}
