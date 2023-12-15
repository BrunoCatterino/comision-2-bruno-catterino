import { Box } from '@mui/material';
import React from 'react';

// Importando el componente HeaderTop que se encuentra en el mismo directorio
import HeaderTop from './HeaderTop';

// Importando el componente SidebarAdm que se encuentra en el mismo directorio
import SidebarAdm from './Sidebar';

// Definiendo un componente de diseño (layout) que toma otro componente como argumento
const Layout = (Component) => ({ ...props }) => {

    return (
        <>
            {/* Contenedor principal que utiliza flex para disposición y altura mínima del 100vh */}
            <div style={{ display: 'flex', minHeight: "100vh" }}>
                
                {/* Barra lateral izquierda, importada del componente SidebarAdm */}
                <SidebarAdm />
                
                {/* Contenedor principal que ocupa el ancho completo y tiene un fondo gris claro */}
                <Box sx={{ width: "100%", bgcolor: "#fafafa" }}>
                    
                    {/* Componente HeaderTop, encabezado superior */}
                    <HeaderTop />
                    
                    {/* Contenedor con relleno que envuelve al componente recibido como argumento */}
                    <Box sx={{ p: 3 }}>
                        <Component {...props} />
                    </Box>
                </Box>
            </div>
        </>
    )
}

// Exportando el componente Layout como exportación predeterminada
export default Layout;
