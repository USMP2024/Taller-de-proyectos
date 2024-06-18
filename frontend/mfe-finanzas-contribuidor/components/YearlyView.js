import React, { useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importar la librería xlsx

function YearlyView() {
  const [data, setData] = useState([]);
  const [año, setAño] = useState(new Date().getFullYear());

  const fetchData = async () => {
    try {
      const response = await axios.post('/backend-giomar/lambda-reporte-ano-contribuidor', { año, usr_int_id_usuario: 127 });
      setData(response.data.ventasPorMes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportData = () => {
    // Obtener la fecha actual
    const now = new Date();
    // Formatear la fecha según el formato deseado: YY_MM_DD_HH_MM
    const formattedDate = `${now.getFullYear().toString().slice(-2)}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}`;
    // Construir el nombre del archivo
    const fileName = `${año}_${formattedDate}_yearReport.xlsx`;

    // Crear un workbook de Excel
    const workbook = XLSX.utils.book_new();
    // Crear una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Agregar la hoja de trabajo al workbook bajo el nombre "Ventas"
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
    // Guardar el archivo Excel con el nombre dinámico
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <h3>Año: {año}</h3>
      <Form>
        <Form.Group controlId="formAño">
          <Form.Label>Seleccione Año</Form.Label>
          <Form.Control as="select" value={año} onChange={(e) => setAño(e.target.value)}>
            {[...Array(25).keys()].map(a => <option key={a+2000} value={a+2000}>{a+2000}</option>)}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>Filtrar</Button>
        <Button variant="secondary" onClick={exportData}>Exportar</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Ventas Totales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.mes}</td>
              <td>{row.ventas_totales}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default YearlyView;
