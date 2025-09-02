import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    setCurrentPage: (args: number) => void;
    currentPage: number;
    countOfPage: number;
}

export function PaginationOderBookPage({setCurrentPage, currentPage, countOfPage}: Props) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Pagination className="py-3.5 h-[70px]">
        <PaginationContent className="text-gray-400">
            <PaginationItem>
                <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                    }}
                />
            </PaginationItem>
            {Array.from({length: countOfPage}, (_, i) => (
            <PaginationItem key={i}>
                <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(i + 1)
                }}
                >
                {i + 1}
                </PaginationLink>
            </PaginationItem>
            ))}

            <PaginationItem>
            <PaginationNext
                href="#"
                onClick={(e) => {
                e.preventDefault()
                if (currentPage < countOfPage) handlePageChange(currentPage + 1)
                }}
            />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
  )
}
