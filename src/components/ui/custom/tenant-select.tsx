"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Tenant } from "@/lib/types";
import { useRouter } from "next/navigation";

const TenantSelect = ({ restaurents }: { restaurents: { data: Tenant[] } }) => {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    router.push(`/?restaurentId=${value}`);
  };
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Restaurent" />
      </SelectTrigger>
      <SelectContent>
        {restaurents.data.map((restaurent) => {
          return (
            <SelectItem key={restaurent.id} value={restaurent.id}>
              {restaurent.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
