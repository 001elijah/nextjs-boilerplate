export const ReviewPagination = ({
  currentPage,
  setCurrentPage,
  totalPages
}: {
  currentPage: number
  setCurrentPage: React.Dispatch<number>
  totalPages: number
}) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          aria-label={`Go to page ${i + 1}`}
          className={`w-3 h-3 rounded-full ${currentPage === i ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'}`}
          key={i}
          onClick={() => setCurrentPage(i)}
        />
      ))}
    </div>
  )
}
