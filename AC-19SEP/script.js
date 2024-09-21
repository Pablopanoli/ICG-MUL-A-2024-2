class SVGManager {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    crearElemento(tag, attributes) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        return element;
    }

    agregarElemento(element) {
        this.svgElement.appendChild(element);
    }
}

class Line {
    constructor(manager, x1, y1, x2, y2) {
        this.manager = manager;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const linea = this.manager.crearElemento('line', {
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
            stroke: 'black',
            'stroke-width': 1
        });
        this.manager.agregarElemento(linea);
    }
}

class Circle {
    constructor(manager, cx, cy, r) {
        this.manager = manager;
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circunferencia = this.manager.crearElemento('circle', {
            cx: this.cx,
            cy: this.cy,
            r: this.r,
            stroke: 'black',
            'stroke-width': 1,
            fill: 'none'
        });
        this.manager.agregarElemento(circunferencia);
    }
}

class Ellipse {
    constructor(manager, cx, cy, rx, ry) {
        this.manager = manager;
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }

    dibujar() {
        const elipse = this.manager.crearElemento('ellipse', {
            cx: this.cx,
            cy: this.cy,
            rx: this.rx,
            ry: this.ry,
            stroke: 'black',
            'stroke-width': 1,
            fill: 'none'
        });
        this.manager.agregarElemento(elipse);
    }
}

// Crear el SVG y la instancia de SVGManager
const svgCanvas = document.getElementById('svgCanvas');
const svgManager = new SVGManager(svgCanvas);

// Dibujar las primitivas
const linea = new Line(svgManager, 50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circle(svgManager, 300, 100, 50);
circunferencia.dibujar();

const elipse = new Ellipse(svgManager, 400, 300, 80, 50);
elipse.dibujar();