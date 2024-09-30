//vercion final 2
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

class Punto {
    #x; 
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

class Line {
    #punto1; 
    #punto2;

    constructor(manager, punto1, punto2) {
        this.manager = manager;
        this.#punto1 = punto1; // Objeto Punto
        this.#punto2 = punto2; // Objeto Punto
    }

    bresenham() {
        const points = [];
        let x1 = this.#punto1.x, y1 = this.#punto1.y;
        const x2 = this.#punto2.x, y2 = this.#punto2.y;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            points.push({ x: x1, y: y1 });
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return points;
    }

    dibujar() {
        const puntos = this.bresenham();
        for (const { x, y } of puntos) {
            const punto = this.manager.crearElemento('circle', {
                cx: x,
                cy: y,
                r: 1,
                fill: 'black'
            });
            this.manager.agregarElemento(punto);
        }
    }
}

class Circle {
    #centro; 
    #r;

    constructor(manager, centro, r) {
        this.manager = manager;
        this.#centro = centro; // Objeto Punto
        this.#r = r;
    }

    bresenham() {
        const points = [];
        let x = this.#r;
        let y = 0;
        let p = 1 - this.#r;

        while (x > y) {
            points.push({ x: this.#centro.x + x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x + x, y: this.#centro.y - y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y - y });
            points.push({ x: this.#centro.x + y, y: this.#centro.y + x });
            points.push({ x: this.#centro.x - y, y: this.#centro.y + x });
            points.push({ x: this.#centro.x + y, y: this.#centro.y - x });
            points.push({ x: this.#centro.x - y, y: this.#centro.y - x });
            y++;

            if (p <= 0) {
                p = p + 2 * y + 1;
            } else {
                x--;
                p = p + 2 * y - 2 * x + 1;
            }
        }
        return points;
    }

    dibujar() {
        const puntos = this.bresenham();
        for (const { x, y } of puntos) {
            const punto = this.manager.crearElemento('circle', {
                cx: x,
                cy: y,
                r: 1,
                fill: 'black'
            });
            this.manager.agregarElemento(punto);
        }
    }
}

class Ellipse {
    #centro; 
    #rx; 
    #ry;

    constructor(manager, centro, rx, ry) {
        this.manager = manager;
        this.#centro = centro; // Objeto Punto
        this.#rx = rx;
        this.#ry = ry;
    }

    bresenham() {
        const points = [];
        let x = 0;
        let y = this.#ry;
        let rx2 = this.#rx * this.#rx;
        let ry2 = this.#ry * this.#ry;
        let p;

        // Región 1
        p = Math.round(ry2 - (rx2 * this.#ry) + (0.25 * rx2));
        while ((2 * ry2 * x) < (2 * rx2 * y)) {
            points.push({ x: this.#centro.x + x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x + x, y: this.#centro.y - y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y - y });
            x++;

            if (p < 0) {
                p += 2 * ry2 * x + ry2;
            } else {
                y--;
                p += 2 * ry2 * x - 2 * rx2 * y + ry2;
            }
        }

        // Región 2
        p = Math.round(ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2);
        while (y > 0) {
            points.push({ x: this.#centro.x + x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y + y });
            points.push({ x: this.#centro.x + x, y: this.#centro.y - y });
            points.push({ x: this.#centro.x - x, y: this.#centro.y - y });
            y--;

            if (p > 0) {
                p -= 2 * rx2 * y + rx2;
            } else {
                x++;
                p += 2 * ry2 * x - 2 * rx2 * y + rx2;
            }
        }
        return points;
    }

    dibujar() {
        const puntos = this.bresenham();
        for (const { x, y } of puntos) {
            const punto = this.manager.crearElemento('circle', {
                cx: x,
                cy: y,
                r: 1,
                fill: 'black'
            });
            this.manager.agregarElemento(punto);
        }
    }
}

// Crear el SVG y la instancia de SVGManager
const svgCanvas = document.getElementById('svgCanvas');
const svgManager = new SVGManager(svgCanvas);

// Crear instancias de Punto
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const centroCirculo = new Punto(300, 100);
const centroElipse = new Punto(400, 300);

// Dibujar las primitivas
const linea = new Line(svgManager, punto1, punto2);
linea.dibujar();

const circunferencia = new Circle(svgManager, centroCirculo, 50);
circunferencia.dibujar();

const elipse = new Ellipse(svgManager, centroElipse, 80, 50);
elipse.dibujar();
