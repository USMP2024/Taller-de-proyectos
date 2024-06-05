import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter,  } from './Router/AppRouter';

function App() {
  return (
    <div>
      <Router>
        <AppRouter/>
      </Router>
      
      
    </div>
  );
}

export default App;