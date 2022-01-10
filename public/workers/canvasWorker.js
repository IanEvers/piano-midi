let canvas;
let ctx;

 
let canvasFondo;
let ctxFondo;

let posicion;

let notasPresionadas = [ ]

let playing = false;
let color = 'red';

let opciones =
{
    holdearNotas: false,
    notaMasBaja: 33,
    notaMasAlta: 86,
    orientacion: 'Vertical',
    grosorLinea: 10,
    velocidad: 60
}

onmessage = function(evt) {
    if(evt.data.nota) {
        const { presionado, nota } = evt.data
        handleNota(presionado, nota)
    } else if (evt.data.opciones) {
        setearConfiguracion(evt.data.opciones.opciones)
    } else if (evt.data.playingStatus) {
        togglePlay(evt.data.playingStatus.playing)
    } else if (evt.data.color) {
        color = evt.data.color;
    } else if (evt.data.canvas) {
        inicializarCanvas(evt.data.canvas)
    }  else if (evt.data.canvasFondo) {
        inicializarCanvasFondo(evt.data.canvasFondo)
    }
};

function setearConfiguracion(opcionesMessage) {
    opciones = opcionesMessage
}

function togglePlay(playingMessage) {
    if(playingMessage) {
        playing = true;
        requestAnimationFrame(renderCanvasFondo);
        requestAnimationFrame(renderCanvas);
    } else {
        playing = false;
    }
}

function handleNota(presionado, nota) {
    if(presionado == 0) {
        if(opciones.holdearNotas == false) {
            const index = notasPresionadas.indexOf(nota);
            if (index > -1) {
                notasPresionadas.splice(index, 1);
            }
        } else {
            return
        }
    } else {
        notasPresionadas.push(nota); 
    }
}

function inicializarCanvas(canvas) {
    ctx = canvas.getContext("2d");
    time = new Date()

    requestAnimationFrame(renderCanvas);
}

function renderCanvas() {
    ctx.fillStyle = color;
    var longitud = notasPresionadas.length
    for (var i=0; i < longitud; ++i){
        if(opciones.orientacion == 'Vertical') {
            ctx.fillRect(notasPresionadas[i] * 5, posicion, opciones.grosorLinea, 5);
        } else {
            ctx.fillRect(posicion, notasPresionadas[i] * 5, 5, opciones.grosorLinea);
        }
    }

    requestAnimationFrame(renderCanvas);
}

function inicializarCanvasFondo(fondo) {
    canvasFondo = fondo

    ctxFondo = canvasFondo.getContext("2d");
    tiempoInicial = new Date()
    
    requestAnimationFrame(renderCanvasFondo);
}

function renderCanvasFondo() {
    const tiempo = new Date() - tiempoInicial;
    posicion = (tiempo/10000) * canvasFondo.height;
    borrar(ctxFondo);
    ctxFondo.fillStyle = color;
    pintarLinea();
    /* chequea la altura del canvas sea orientación vertical u horizontal, porque el canvas es cuadrado. */
    if(posicion > canvasFondo.height) { 
        tiempoInicial = new Date();
    }

    if(playing) {
        requestAnimationFrame(renderCanvasFondo);
    }
}

// FUNCIONES DE PINTADO Y DESPINTADO DEL CANVAS

function pintarLinea() {
    if(opciones.orientacion == 'Vertical') {
        ctxFondo.fillRect(0, posicion, canvasFondo.width, 1);
    } else {
        ctxFondo.fillRect(posicion, 0, 1, canvasFondo.width);
    }
}

function borrar(canvas) {
    canvas.clearRect(0, 0, canvasFondo.width, canvasFondo.height);
}