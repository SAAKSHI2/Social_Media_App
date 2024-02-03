import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Layout />} children={
        [<Route path="/home" element={<Home />} key="homePage"/>,
        <Route path="/profile/:id" element={<Profile/>} key="profilePage"/>
      ]}
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
