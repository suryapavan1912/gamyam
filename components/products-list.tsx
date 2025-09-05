import { Product } from "@/app/page";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";

interface ProductListProps {
    products: Product[];
    loading: boolean;
    handleEdit: (id: number) => void;
}

const ProductList = ({ products, loading, handleEdit }: ProductListProps) => {

    if (loading) {
        return (
            <div className="w-full min-w-6xl mx-auto">
                <Skeleton className="h-240 w-full" />
            </div>
        );
    }

    if (products.length === 0) {
        return <div className="flex justify-center items-center h-24 text-zinc-600">No products found.</div>;
    }

    return (
        <div className="w-full min-w-6xl mx-auto">
            {products.map((product) => (
                <div key={product.id} className={cn("flex items-center gap-4 border border-zinc-200 rounded-lg p-4 mb-4", product.isActive ? "" : "bg-red-50")}>

                    <div className="flex-1 min-w-0 ">
                        <h2 className="text-lg font-semibold text-zinc-800 truncate">{product.name || "N/A"}</h2>
                        <p className="text-sm text-zinc-600 line-clamp-2 mt-1">{product.description || "No description provided."}</p>
                    </div>

                    <div className="w-20 flex-shrink-0 text-sm text-zinc-500">
                        <p>${(product.price || 0).toFixed(2)}</p>
                    </div>

                    <div className="w-20 flex-shrink-0 text-sm text-zinc-500">
                        <p>{product.category || "N/A"}</p>
                    </div>

                    <div className="w-20 flex-shrink-0 text-sm text-zinc-500">
                        <p>{product.stock !== undefined ? product.stock : "N/A"}</p>
                    </div>

                    <div className="w-48 flex-shrink-0 flex flex-col items-end gap-1 text-sm text-zinc-500">
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1 justify-end">
                                {product.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">{tag}</Badge>
                                ))}
                            </div>
                        )}
                        <p className="text-xs text-zinc-400 mt-1">{new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="w-10 flex-shrink-0">
                        <Button variant="outline" size="icon" className="hover:bg-zinc-100 cursor-pointer" onClick={() => handleEdit(product.id)}>
                            <EditIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList;