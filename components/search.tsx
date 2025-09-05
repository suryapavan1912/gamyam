import { Input } from "@/components/ui/input";

interface SearchComponentProps {
    search: string;
    setSearch: (search: string) => void;
}

const SearchComponent = ({ search, setSearch }: SearchComponentProps) => {
    return (
        <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchComponent;