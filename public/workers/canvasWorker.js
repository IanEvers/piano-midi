
let canvas;
let ctx;

let canvasFondo;
let ctxFondo;

let posicion;
let orientacion = 'vertical';

let cambioNotaMasBaja = false;
let cambioNotaMasAlta = false;

let pausa;

let color = 'red'

onmessage = function(evt) {
    if(evt.data.nota) {
        const { presionado, nota } = evt.data
        handleNota(presionado, nota)
    } else if (evt.data.opciones) {
        setearConfiguracion(evt.data.opciones)
    } else if (evt.data.canvas) {
        inicializarCanvas(evt.data.canvas)
    }  else if (evt.data.canvasFondo) {
        inicializarCanvasFondo(evt.data.canvasFondo)
    }
};

function handleNota() {

}

function inicializarCanvas(canvas) {
    ctx = canvas.getContext("2d");
    time = new Date()

    requestAnimationFrame(renderCanvas);
}

function renderCanvas() {

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
    requestAnimationFrame(renderCanvasFondo);
}

function pintarLinea() {
    if(orientacion == 'vertical') {
        ctxFondo.fillRect(0, posicion, canvasFondo.width, 1);
    } else {
        ctxFondo.fillRect(posicion, 0, 1, canvasFondo.width);
    }
}

function borrar(canvas) {
    canvas.clearRect(0,0,canvasFondo.width, canvasFondo.height);
}