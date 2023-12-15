import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas accesibles solo para administradores
const AdminRoute = ({ children }) => {
// Extraer la información del usuario del estado global utilizando useSelector
    const { userInfo } = useSelector((state) => state.signIn);
    return userInfo && userInfo.role === 'admin' ? children : <Navigate to="/" />;
}

export default AdminRoute