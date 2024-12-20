import React from 'react';
import * as XLSX from 'xlsx';
import { FormatoExcel } from './FormatoExcel';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import downloadExcel from "../assets/img/import_icon_128503.svg"
import uploadExcel from "../assets/img/upload-excel.webp"

export const ExcelToTable = ({ onDataImport }) => {
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                if (!workbook.SheetNames.length) {
                    throw new Error("El archivo no contiene hojas válidas.");
                }

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                if (!jsonData.length || !jsonData[0].length) {
                    throw new Error("El archivo Excel está vacío o no tiene encabezados.");
                }

                // Convertimos encabezados a mayúsculas
                const headers = jsonData[0].map((header) => header.toUpperCase());

                // Transformamos los datos
                const formattedData = jsonData.slice(1).map((row) =>
                    headers.reduce((acc, header, index) => {
                        acc[header] = row[index] || ""; // Asigna cada valor a su encabezado
                        return acc;
                    }, {})
                );

                onDataImport(formattedData); // Pasar datos al componente padre

                // Mensaje de éxito
                Swal.fire({
                    text: 'Archivo cargado correctamente.',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    width: '300px',
                });
            } catch (error) {
                // Mensaje de error
                Swal.fire({
                    text: `Error al cargar el archivo: ${error.message}`,
                    icon: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    width: '300px',
                });
            }
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        } else {
            Swal.fire({
                text: "No se seleccionó ningún archivo.",
                icon: 'warning',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                width: '300px',
            });
        }
    };

    return (
        <div className='flex justify-start'>
            <input
                id='input-file'
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Boton para importar excel */}
            <label
                htmlFor='input-file'
                className='relative cursor-pointer flex flex-col justify-center items-center group'
            >
                <img src={uploadExcel} alt='Import Excel' className='bg-white rounded-l-md h-12 w-12 p-2 mb-2 hover:scale-90 hover:rounded-full' />

                <span className="absolute w-40 bottom-0 left-0 transform -translate-x-0 translate-y-full text-sm text-gray-700 bg-white p-1 border border-gray-400 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">Subir archivo Excel</span>
            </label>

            <label
                htmlFor='input-file'
                className='relative cursor-pointer flex flex-col items-center group'
            >
                <FormatoExcel />
                <span className="absolute w-40 bottom-0 left-0 transform -translate-x-0 translate-y-full text-sm text-gray-700 bg-white p-1 border border-gray-400 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">Descargar Excel Ejemplo</span>
            </label>


            <label
                className='relative cursor-pointer flex flex-col items-center group'
            >
                <img src={downloadExcel} alt='Import Excel' className='bg-white rounded-r-md h-12 w-12 p-[10px] mb-2 hover:scale-90 hover:rounded-full' />

                <span className="absolute w-40 bottom-0 left-0 transform -translate-x-0 translate-y-full text-sm text-gray-700 bg-white p-1 border border-gray-400 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">Descargar archivo Excel</span>
            </label>

        </div>
    );
};
