

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // botones alternativos
    ['blockquote'],

    [{ 'header': 1 }, { 'header': 2 }],               // Valores de botones personalizados
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superíndice/subíndice
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    //[{ 'size': ['small', false, 'large', 'huge'] }],  // personalización del desplegable
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // desplegable con valores predeterminados del tema
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // Eliminar el formato del botón
];

export const modules = {
    toolbar: toolbarOptions,
};