import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Stats() {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>Ingresos totales: 0,00 US$</Card.Text>
          </Col>
          <Col>
            <Card.Text>Descargas totales: 0</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>Ingresos por recomendaciones: 0,00 US$</Card.Text>
          </Col>
          <Col>
            <Card.Text>Recomendaciones totales: 0</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Stats;
