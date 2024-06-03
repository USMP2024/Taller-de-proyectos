const mysql = require('mysql2/promise');

// Función principal de Lambda
const handler = async (event, context) => {
    // Configurar la conexión a la base de datos MySQL en AWS RDS
    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });
};

const Jimp = require('jimp/es');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  try {
    const image = await s3.getObject({
      Bucket: bucket,
      Key: key
    }).promise();

    const processedImage = await Jimp.read(image.Body)
      .text('your watermark text', 20, 20, {
        textMargin: 10,
        alignmentX: Jimp.ALIGN_LEFT,
        alignmentY: Jimp.ALIGN_TOP,
        font: '30px Arial #fff'
      })
      .quality(80)
      .getBase64('image/jpeg');

    await s3.putObject({
      Bucket: 'your-destination-bucket-name',
      Key: key,
      Body: processedImage,
      ContentType: 'image/jpeg'
    }).promise();

    console.log('Image processed and saved successfully');
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

module.exports = {handler}