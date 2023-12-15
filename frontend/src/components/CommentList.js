import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// Componente CommentList para mostrar una lista de comentarios
const CommentList = ({ name, text }) => {
    return (
        <>
            {/* Lista de comentarios con estilos específicos */}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {/* Elemento de lista que muestra un comentario */}
                <ListItem alignItems="flex-start">
                    {/* Avatar del usuario que realizó el comentario */}
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    {/* Contenido del comentario, incluyendo el nombre del usuario y el texto del comentario */}
                    <ListItemText
                        primary={name} // Nombre del usuario
                        secondary={
                            <>
                                {/* Texto del comentario con estilos específicos */}
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {text}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
            </List>
        </>
    );
}

export default CommentList;
