const AWS = require('aws-sdk');
const ExcelJS = require('exceljs');

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    try {
        // Obtener los datos del reporte del evento
        const reportData = JSON.parse(event.body);

        // Verificar que los datos del reporte son un JSON válido
        if (!reportData || typeof reportData !== 'object') {
            return {
                statusCode: 400,
                body: 'Los datos del reporte deben ser un objeto JSON.'
            };
        }

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte');

        // Agregar las columnas al Excel
        Object.keys(reportData).forEach(key => {
            worksheet.columns = [
                { header: key, key: key, width: 15 }
            ];
        });

        // Agregar los datos al Excel
        worksheet.addRow(reportData);

        // Generar el archivo Excel en un buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Subir el archivo Excel a tu bucket de S3
        const accessPointArn = 'arn:aws:s3:::s3-archivos-excel';

        const params = {
            Bucket: accessPointArn,
            Key: `reporte_${Date.now()}.xlsx`,
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };

        await s3.putObject(params).promise();
        
        return {
            statusCode: 200,
            body: `Archivo Excel generado y guardado en el Access Point ${accessPointArn}.`
        };
    } catch (err) {
        console.error('Error al generar el archivo Excel:', err);
        return {
            statusCode: 500,
            body: 'Error al generar el archivo Excel. Por favor, intenta de nuevo más tarde.'
        };
    }
};
