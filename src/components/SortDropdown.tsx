"use client";

import type { SortOption } from "@/lib/utils";

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center justify-end gap-3 text-sm text-gray-600">
      সাজান
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="select select-sm w-auto"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}