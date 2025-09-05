"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef, Suspense } from "react";
import { toast } from "sonner";
import ProductList from "@/components/products-list";
import ProductGrid from "@/components/products-grid";
import PaginationComponent from "@/components/pagination";
import HeaderComponent from "@/components/header";
import SearchComponent from "@/components/search";

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    description: string;
    createdAt: string;
    isActive: boolean;
    tags: string[];
}

export interface Pagination {
    page: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
}

function HomePageContainer({ page, limit, searchText }: { page: number, limit: number, searchText: string }) {

    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false, nextPage: null, previousPage: null });
    const [search, setSearch] = useState<string>(searchText);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<"list" | "grid">("list");
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();

    // Fetch products
    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/products`, { params: { page, limit, text: search } });
            const { data, pagination } = response.data;
            console.log(data, pagination);
            setProducts(data);
            setPagination(pagination);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products");
            setError("Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, search]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSetSearch = (searchText: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setSearch(searchText);
        }, 500);
    }

    const handlePageChange = (page: number) => {
        router.push(`/?page=${page}${searchText ? `&text=${searchText}` : ""}`);
    }

    const handleEdit = (id: number) => {
        router.push(`/edit?id=${id}`);
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-center">Something went wrong. Please try later.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-8">
            <HeaderComponent view={view} setView={setView} />
            <SearchComponent search={search} handleSetSearch={handleSetSearch} />

            <div className="flex flex-col gap-4 border-2 border-zinc-200 rounded-md p-8 overflow-x-auto">
                {view === "list" ? (
                    <ProductList products={products} loading={isLoading} handleEdit={handleEdit} />
                ) : (
                    <ProductGrid products={products} loading={isLoading} handleEdit={handleEdit} />
                )}
            </div>

            <PaginationComponent pagination={pagination} handlePageChange={handlePageChange} />
        </div>
    )
}

function HomePage() {
    const searchParams = useSearchParams();
    const page : number = parseInt(searchParams.get("page") || "1");
    const limit : number = parseInt(searchParams.get("limit") || "10");
    const searchText : string = searchParams.get("text") || "";

    return <HomePageContainer page={page} limit={limit} searchText={searchText} />
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}> 
            <HomePage />
        </Suspense>
    )
}