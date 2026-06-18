"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const TenantSelect = ({ restaurents }: { restaurents: { data: Tenant[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleValueChange = (value: string) => {
    router.push(`/?restaurantId=${value}`);
  };
  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("restaurantId") || ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Restaurent" />
      </SelectTrigger>
      <SelectContent>
        {restaurents.data.map((restaurent) => {
          return (
            <SelectItem key={restaurent.id} value={String(restaurent.id)}>
              {/*defaultValue expects string and id is number,so typecast to string*/}
              {restaurent.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
