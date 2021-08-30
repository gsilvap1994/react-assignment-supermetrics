import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/auth.context';
import Routes from './routes'

const App = () => {


  return (
    <AuthProvider value={{ authenticated: true }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
