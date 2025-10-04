import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
export function PaginationOderBookPage({ setCurrentPage, currentPage, countOfPage }) {
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (_jsx(Pagination, { className: "py-3.5 h-[70px]", children: _jsxs(PaginationContent, { className: "text-gray-400", children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", onClick: (e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                                handlePageChange(currentPage - 1);
                        } }) }), Array.from({ length: countOfPage }, (_, i) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: currentPage === i + 1, onClick: (e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                        }, children: i + 1 }) }, i))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", onClick: (e) => {
                            e.preventDefault();
                            if (currentPage < countOfPage)
                                handlePageChange(currentPage + 1);
                        } }) })] }) }));
}
