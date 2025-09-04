import { GridIcon, ListIcon } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderComponentProps {
    view: "list" | "grid";
    setView: (view: "list" | "grid") => void;
}

const HeaderComponent = ({ view, setView }: HeaderComponentProps) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl mb-4">Product List</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="hover:bg-zinc-100 cursor-pointer" onClick={() => setView("list")} disabled={view === "list"}>
                    <ListIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-zinc-100 cursor-pointer" onClick={() => setView("grid")} disabled={view === "grid"}>
                    <GridIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default HeaderComponent;