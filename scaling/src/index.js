import ReactDOM from 'react-dom/client';
import './index.css';
import Scaling from './components/Scaling';
import { BrowserRouter } from 'react-router-dom';

// ========================================	
const root = ReactDOM.createRoot(document.getElementById("root"));	
root.render(<BrowserRouter><Scaling/> </BrowserRouter>);