import Chat from './chat';
import Register from './pages/register';
import Login from './pages/login';
import AuthTab from './pages/authTab';
import  './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
   return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthTab/>} />
                <Route path="/app" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;
