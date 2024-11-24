/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

interface SearchResultProps {
  data: any[];
}

const SearchResult: FC<SearchResultProps> = () => {
  
  return (
    <div className="w-full max-h-64 bg-white rounded border cursor-pointer border-yellow-500 mt-2 overflow-y-auto shadow-sm flex flex-col items-start">
    </div>
  );
};

export default SearchResult;
