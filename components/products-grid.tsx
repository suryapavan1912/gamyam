import { Product } from "@/app/page";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
    handleEdit: (id: number) => void;
}
const ProductGrid = ({ products, loading, handleEdit }: ProductGridProps) => {

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
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id} className={cn("border border-zinc-200 rounded-lg p-4 flex flex-col h-full", product.isActive ? "" : "bg-red-50")}>
                    <h2 className="text-lg font-semibold text-zinc-800 truncate mb-1">{product.name || "N/A"}</h2>
                    <p className="text-sm text-zinc-600 line-clamp-2 mb-3">{product.description || "No description provided."}</p>

                    <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
                        <p className="font-medium">{product.category || "N/A"}</p>
                        <p className="font-medium">{product.stock || "N/A"}</p>
                    </div>

                    <p className="text-base font-bold text-zinc-900 mb-3">${(product.price || 0).toFixed(2)}</p>

                    <div className="flex items-center justify-between text-sm text-zinc-500">
                        <div>
                            {product.tags && product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {product.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">{tag}</Badge>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-zinc-400">{new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Button variant="outline" size="icon" className="hover:bg-zinc-100 cursor-pointer" onClick={() => handleEdit(product.id)}>
                            <EditIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductGrid;