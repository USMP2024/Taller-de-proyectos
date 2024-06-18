import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import MonthlyView from './MonthlyView';
import YearlyView from './YearlyView';

function NavTabs() {
  const [key, setKey] = useState('month');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="month" title="Por Mes">
        <MonthlyView />
      </Tab>
      <Tab eventKey="year" title="Por Año">
        <YearlyView />
      </Tab>
    </Tabs>
  );
}

export default NavTabs;
