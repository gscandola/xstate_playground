import { createRoot } from 'react-dom/client';
import App from './App';


const $root = document.getElementById('app');
if (!$root) throw new Error('No root element with id "mfe-wrapper" is found');
const root = createRoot($root);
root.render(<App />);
