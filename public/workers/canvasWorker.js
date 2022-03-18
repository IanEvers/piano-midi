let ctx;
 
let canvasFondo;
let ctxFondo;

let canvasLado;

let posicion;

let notasPresionadas = []

let notasTotales;

let proporcionNotasCanvas;

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
    }  else if (evt.data.borrarCanvas) {
        tiempoInicial = new Date()
        borrar(ctx)
    }
};

function setearConfiguracion(opcionesMessage) {

    if(opciones.holdearNotas == true && opcionesMessage.holdearNotas == false) {
        notasPresionadas.splice(0, notasPresionadas.length)
    }

    opciones = opcionesMessage
    notasTotales = opciones.notaMasAlta - opciones.notaMasBaja
    proporcionNotasCanvas = canvasLado / notasTotales
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

function inicializarCanvas(canvasMessage) {
    ctx = canvasMessage.getContext("2d");
    canvasLado = canvasMessage.width;

    requestAnimationFrame(renderCanvas);
}

function renderCanvas() {
    ctx.fillStyle = color;
    var longitud = notasPresionadas.length
    var notaMasBaja = opciones.notaMasBaja
    var grosorLinea = opciones.grosorLinea
    for (var i=0; i < longitud; ++i) {
        if(opciones.orientacion == 'Vertical') {
            ctx.fillRect( ( ( notasPresionadas[i] - notaMasBaja -1) * (canvasLado / notasTotales) ), posicion , grosorLinea, 1);
        } else {
            ctx.fillRect(posicion , ( ( notasPresionadas[i] - notaMasBaja -1) * (canvasLado / notasTotales) ), 1, grosorLinea);
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
    posicion = ((tiempo * opciones.velocidad) / 1000000) * canvasLado;

    borrar(ctxFondo);
    
    ctxFondo.fillStyle = color;
    pintarLinea();

    if(posicion > canvasLado) { 
        tiempoInicial = new Date();
    }

    if(playing) {
        requestAnimationFrame(renderCanvasFondo);
    }
}

// FUNCIONES DE PINTADO Y DESPINTADO DEL CANVAS

function pintarLinea() {
    if(opciones.orientacion == 'Vertical') {
        ctxFondo.fillRect(0, posicion, canvasLado, 1);
    } else {
        ctxFondo.fillRect(posicion, 0, 1, canvasLado);
    }
}

function borrar(ctx) {
    ctx.clearRect(0, 0, canvasLado, canvasLado);
}