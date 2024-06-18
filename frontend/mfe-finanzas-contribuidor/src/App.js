import React from 'react';
import Header from '../components/Header';
import Stats from '../components/Stats';
import { Container, Row, Col } from 'react-bootstrap';
import NavTabs from '../components/NavTabs';
//import NavTabs from './components/NavTabs';
//import DateSelector from './components/DateSelector';
//import IncomeDisplay from './components/IncomeDisplay';
//import Footer from './components/Footer';
//import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Header />
        </Col>
        <Col md={9}>
          <Stats />
        </Col>
      </Row>
      <Row>
        <NavTabs />
      </Row>
    </Container>
  );
}

export default App;
