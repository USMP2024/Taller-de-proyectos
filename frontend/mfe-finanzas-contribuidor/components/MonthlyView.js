import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importar la librería xlsx

function MonthlyView() {
  const [data, setData] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [año, setAño] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [mes, año]);

  const fetchData = async () => {
    try {
      const response = await axios.post('/backend-giomar/lambda-reporte-mes-contribuidor', { mes, año, usr_int_id_usuario: 127 });
      setData(response.data.ventasPorDía);
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
    const fileName = `${formattedDate}_monthReport.xlsx`;

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
      <Form>
        <Form.Group controlId="formMes">
          <Form.Label>Mes</Form.Label>
          <Form.Control as="select" value={mes} onChange={(e) => setMes(e.target.value)}>
            {[...Array(12).keys()].map(m => <option key={m+1} value={m+1}>{m+1}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAño">
          <Form.Label>Año</Form.Label>
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
            <th>Fecha de Venta</th>
            <th>Producto</th>
            <th>Nombre del Producto</th>
            <th>Precio del Producto</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.fecha_venta}</td>
              <td>{row.ven_int_id_producto}</td>
              <td>{row.pro_txt_nombre_producto}</td>
              <td>{row.pro_val_precio_producto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MonthlyView;
