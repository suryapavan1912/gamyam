import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface SearchComponentProps {
    search: string;
    handleSetSearch: (search: string) => void;
}

const SearchComponent = ({ search, handleSetSearch }: SearchComponentProps) => {
    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    const handleInputChange = (value: string) => {
        setLocalSearch(value);
        handleSetSearch(value);
    };

    return (
        <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search" value={localSearch} onChange={(e) => handleInputChange(e.target.value)} />
        </div>
    )
}

export default SearchComponent;