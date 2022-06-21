import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './component/menu'
import {ROUTES} from './component/route'
function App() {
  return (
      <Menu routes={ROUTES}/>
  );
}

export default App;
