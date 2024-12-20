import React, { useState } from "react";
import dataExample from "../dataExample.js";
import { ExcelToTable } from "./ExcelToTable.jsx";
import { Pagination } from "./Pagination.jsx";


export const TablaDinamica = () => {
  const [datas, setDatas] = useState(dataExample);
  const [columnMapping, setColumnMapping] = useState({}); // Mapeo dinámico de encabezados
  
  const [paginaActual, setPaginaActual] = useState(1);
  const colPorPaginas = 20;

  const inicio = (paginaActual - 1) * colPorPaginas;
  const final = inicio + colPorPaginas;
  const dataActual = datas.slice(inicio, final);
  const totalPaginas = Math.ceil(datas.length / colPorPaginas);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPaginas) {
//       setPaginaActual(page);
//     }
//   };


  const handleImportExcel = (importedData) => {
    const filteredData = importedData.filter((row) => {
        return Object.values(row).some((value) => value !== null && value !== "") // filtramos filas vacias
    })

    setDatas(filteredData);
    setPaginaActual(1);
  };

  const headers = datas.length > 0 ? Object.keys(datas[0]) : [];

  
  // Actualizar el mapeo de encabezados
  const handleColumnMappingChange = (colIndex, selectedHeader) => {
    setColumnMapping((prev) => ({
      ...prev,
      [colIndex]: selectedHeader,
    }));
  };

  return (
    <div className="flex flex-col justify-center w-full p-2">
      <ExcelToTable onDataImport={handleImportExcel} />

      <table className="table-auto border-collapse border border-gray-300 w-auto text-sm mt-5">
        {/* Encabezado de la TablaDinamica */}
        <thead>
          <tr>
            {Array.from({ length: headers.length }).map((_, colIndex) => (
              <th
                key={colIndex}
                
              >
                <select
                  value={columnMapping[colIndex] || ""}
                  onChange={(e) =>
                    handleColumnMappingChange(colIndex, e.target.value)
                  }

                  className=" w-full h-full p-2 bg-blue-950 text-white"
                >
                  <option value="" disabled>
                    Seleccionar encabezado
                  </option>
                  {headers.map((header, index) => (
                    <option key={index} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo de la TablaDinamica */}
        <tbody>
          {dataActual.map((item, rowIndex) => (
            <tr key={rowIndex} className="text-center">
              {Array.from({ length: headers.length }).map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="border border-gray-300 px-2 py-2 h-8"
                >
                  {item[columnMapping[colIndex]] || ""}
                </td>
              ))}
            </tr>
          ))}

          {/* Filas vacías cuando no hay datos */}
          {dataActual.length === 0 &&
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                {Array.from({ length: headers.length }).map((_, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-gray-300 px-2 py-2"
                  >
                    {/* Celdas vacías */}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Controles de Paginación */}
      <Pagination
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPageChange={(page) => setPaginaActual(page)}
      />
    </div>
  );
};
