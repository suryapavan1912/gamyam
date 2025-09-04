import { Pagination } from "@/app/page";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";

interface PaginationComponentProps {
    pagination: Pagination;
    handlePageChange: (page: number) => void;
}

const PaginationComponent = ({ pagination, handlePageChange }: PaginationComponentProps) => {

    return (
        <div className="flex justify-center items-center gap-2">
            <div className="flex items-center gap-2">

                {pagination.hasPreviousPage && (
                    <>
                        <Button variant="outline" size="icon" onClick={() => handlePageChange(1)}>
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handlePageChange(pagination.previousPage || 0)}>
                            <span className="text-sm">{pagination.previousPage}</span>
                        </Button>
                    </>
                )}

                <Button size="icon" disabled>
                    <span className="text-sm">{pagination.page}</span>
                </Button>

                {pagination.hasNextPage && (
                    <>
                        <Button variant="outline" size="icon" onClick={() => handlePageChange(pagination.nextPage || pagination.totalPages)}>
                            <span className="text-sm">{pagination.nextPage}</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handlePageChange(pagination.totalPages)}>
                            <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaginationComponent;