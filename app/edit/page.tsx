"use client";

import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ProductForm from "@/components/product-form";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z.number().min(0, { message: "Price must be greater than 0" }),
    category: z.string().min(1, { message: "Category is required" }),
    description: z.string().optional(),
    stock: z.number().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

const EditPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
    });

    const fetchProduct = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/products/${id}`);
            const product = response.data;
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchProduct();
    }, [fetchProduct, id]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validatedData = productSchema.safeParse(formData);
        if (!validatedData.success) {
            toast.error(validatedData.error.message);
            return;
        }

        try {
            await axios({
                method: id ? "PUT" : "POST",
                url: id ? `/api/products/${id}` : "/api/products",
                data: validatedData.data,
            });
            toast.success("Product updated successfully");
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    }

    if (loading) {
        return (
            <div className="w-full min-w-6xl mx-auto">
                <Skeleton className="h-240 w-full" />
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-8">
            <ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
    );
}

export default EditPage;