import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Person3Icon from '@mui/icons-material/Person3';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const SidebarAdm = () => {
    // Obteniendo la información del usuario del estado global
    const { userInfo } = useSelector(state => state.signIn);
    
    // Obteniendo la función de despacho de acciones de Redux
    const dispatch = useDispatch();
    
    // Obteniendo la función de navegación de React Router
    const navigate = useNavigate();

    // Efecto secundario para cargar el perfil del usuario al cargar el componente
    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    // Función para cerrar sesión
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    }

    return (
        <>
            {/* Barra lateral */}
            <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
                {/* Contenedor principal con disposición de columnas */}
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                    {/* Sección del menú superior */}
                    <Box sx={{ pt: 4 }}>
                        {/* Menú de navegación */}
                        <Menu
                            menuItemStyles={{
                                // Estilos para los elementos del menú
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                // Estilos para los iconos del menú
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: '#1976d2',
                                    }
                                },
                            }}
                        >
                            {/* Elementos del menú condicionales según el rol del usuario */}
                            {userInfo && userInfo.role === 'admin' ?
                                <>
                                    <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Panel </MenuItem>
                                    <MenuItem component={<Link to="/admin/post/create" />} icon={<PostAddIcon />}> Crear publicación </MenuItem>
                                </> :
                                <>
                                    <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}> Panel </MenuItem>
                                </>
                            }
                        </Menu>
                    </Box>
                    {/* Sección del menú inferior */}
                    <Box sx={{ pb: 2 }}>
                        {/* Menú de navegación */}
                        <Menu
                            menuItemStyles={{
                                // Estilos para los elementos del menú
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                // Estilos para los iconos del menú
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: '#1976d2',
                                    }
                                },
                            }}
                        >
                            {/* Elemento de menú para cerrar sesión */}
                            <MenuItem onClick={logOut} icon={<LoginIcon />}>   Cerrar sesión </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
}

export default SidebarAdm;
