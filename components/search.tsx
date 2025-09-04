import { Input } from "@/components/ui/input";

interface SearchComponentProps {
    search: string;
    handleSearch: (search: string) => void;
}

const SearchComponent = ({ search, handleSearch }: SearchComponentProps) => {
    return (
        <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e.target.value)} />
        </div>
    )
}

export default SearchComponent;