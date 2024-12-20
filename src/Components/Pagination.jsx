import React from "react";

export const Pagination = ({ paginaActual, totalPaginas, onPageChange }) => {
  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 7;

    if (totalPaginas <= maxVisible) {
      for (let i = 1; i <= totalPaginas; i++) {
        range.push(i);
      }
    } else {
      range.push(1);

      if (paginaActual <= 4) {
        for (let i = 2; i <= 5; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPaginas);
      } else if (paginaActual > totalPaginas - 4) {
        range.push("...");
        for (let i = totalPaginas - 4; i < totalPaginas; i++) {
          range.push(i);
        }
        range.push(totalPaginas);
      } else {
        range.push("...");
        for (let i = paginaActual - 1; i <= paginaActual + 1; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPaginas);
      }
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        className={`btn btn-sm ${
          paginaActual === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        {"<"}
      </button>

      {paginationRange.map((page, index) => (
        <button
          key={index}
          className={`btn btn-sm ${
            paginaActual === page
              ? "bg-blue-500 text-white"
              : page === "..."
              ? "cursor-default"
              : ""
          }`}
          onClick={() => page !== "..." && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className={`btn btn-sm ${
          paginaActual === totalPaginas ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        {">"}
      </button>
    </div>
  );
};
