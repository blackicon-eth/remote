import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SortingDirections } from "@/lib/enums";
import { SortingColumns } from "@/lib/enums";

interface TableHeaderButtonProps {
  text: string;
  sortColumn: SortingColumns | null;
  sortDirection: SortingDirections | null;
  column: SortingColumns;
  onSort: (column: SortingColumns) => void;
  sortable?: boolean;
}

export const TableHeaderButton = ({
  text,
  sortColumn,
  sortDirection,
  column,
  onSort,
  sortable = true,
}: TableHeaderButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center gap-1 w-[25%] h-full ${
        sortable
          ? "cursor-pointer hover:text-neutral-300 transition-colors"
          : ""
      }`}
      onClick={() => sortable && onSort(column)}
    >
      {text}
      {sortable && (
        <AnimatePresence>
          {sortColumn === column && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: sortDirection === "asc" ? 180 : 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </button>
  );
};
