import React from 'react'
import bajarExcel from "../assets/img/upload-excel.webp"

export const FormatoExcel = () => {
  return (
    <div>
        <a 
        href="./example.xlsx" // Ruta al archivo Excel
        download="example.xlsx" // Nombre del archivo descargado
        className="inline-flex items-center"
        >
            <img src={bajarExcel} alt="Descargar Excel" className="bg-white h-12 w-12 p-2 mb-2 hover:scale-90 hover:rounded-full" />
        </a>
    </div>
  )
}
