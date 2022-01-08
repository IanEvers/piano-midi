
let canvas;
let ctx;

let canvasFondo;
let ctxFondo;

let posicion;
let orientacion = 'vertical';

let cambioNotaMasBaja = false;
let cambioNotaMasAlta = false;

let playing = false;

let color = 'red'

let holdearNotas = false;

let notasPresionadas = [ ]

let grosorLinea = 10


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

function setearConfiguracion(opciones) {
    console.log(opciones)
    
    playing = opciones.playing;
    if(playing == true) {
        requestAnimationFrame(renderCanvasFondo);
        requestAnimationFrame(renderCanvas);
    }
    holdearNotas = opciones.holdearNotas
    console.log(holdearNotas)
}

function handleNota(presionado, nota) {
    console.log(holdearNotas)
    if(presionado == 0 ) {
        if(holdearNotas == false) {

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
    notasPresionadas.forEach(nota => {        
        ctx.fillStyle = color;
        if(orientacion == 'vertical') {
            ctx.fillRect(nota * 5, posicion, grosorLinea, 5);
        } else {
            ctx.fillRect(posicion, nota * 5, 5, grosorLinea);
        }
    });

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
    if(orientacion == 'vertical') {
        ctxFondo.fillRect(0, posicion, canvasFondo.width, 1);
    } else {
        ctxFondo.fillRect(posicion, 0, 1, canvasFondo.width);
    }
}

function borrar(canvas) {
    canvas.clearRect(0, 0, canvasFondo.width, canvasFondo.height);
}