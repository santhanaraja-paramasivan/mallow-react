import { cn } from "@/lib/utils";
import React from "react";

const column = 3;
const row = 10;

function DataTableSkeleton({ heightClass }: { heightClass: string }) {
  return (
    <div
      role="status"
      className={cn(
        "p-4 space-y-4  rounded animate-pulse",
        heightClass,
        "overflow-y-auto"
      )}
    >
      <table className="w-full">
        <thead>
          <tr>
            {[...new Array(column)].map((_, idx) => (
              <td className="bg-gray-300 py-5" key={idx} />
            ))}
          </tr>
        </thead>
        <tbody>
          {[...new Array(row)].map((_, index) => (
            <tr key={index}>
              {[...new Array(column)].map((_, idx) => (
                <td className="py-3" key={idx}>
                  {" "}
                  <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableSkeleton;
