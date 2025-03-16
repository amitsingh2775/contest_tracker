import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
// import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import AddSolution from './pages/AddSolution';
import Login from './pages/Login';
import Register from './pages/Register';
import PastContests from './pages/PastContests';
// import ThemeToggle from './components/ThemeToggle';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      {/* <ThemeProvider> */}
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/bookmarks" element={<PrivateRoute element={<Bookmarks />} />} />
            <Route path="/past-contests" element={<PrivateRoute element={<PastContests />} />} />
            <Route path="/add-solution" element={<PrivateRoute element={<AddSolution />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
}

export default App;
