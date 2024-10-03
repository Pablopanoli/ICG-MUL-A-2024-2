class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

const svg = document.getElementById('svg');
const puntos = [
    new Punto(50, 50), 
    new Punto(200, 50), 
    new Punto(200, 200), 
    new Punto(50, 200)
];

let mostrarCentroide = false;

function esConvexa(puntos) {
    let sign = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const crossProduct = (p2.getX() - p1.getX()) * (p3.getY() - p1.getY()) - (p2.getY() - p1.getY()) * (p3.getX() - p1.getX());

        if (crossProduct !== 0) {
            if (sign === 0) {
                sign = crossProduct > 0 ? 1 : -1;
            } else if ((crossProduct > 0 ? 1 : -1) !== sign) {
                return false; // Cóncavo
            }
        }
    }

    return true; // Convexo
}

function calcularCentroide() {
    let cx = 0, cy = 0;
    puntos.forEach(p => {
        cx += p.getX();
        cy += p.getY();
    });
    return new Punto(cx / puntos.length, cy / puntos.length);
}

function dibujarPoligono() {
    svg.innerHTML = ''; // Limpiar el SVG antes de dibujar
    let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;

    for (let i = 1; i < puntos.length; i++) {
        pathData += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
    }

    pathData += ' Z'; // Cerrar el camino

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    if (esConvexa(puntos)) {
        console.log("La figura es convexa");
    } else {
        console.log("La figura es cóncava");
    }

    if (mostrarCentroide) {
        dibujarCentroide();
    }
}

function dibujarCentroide() {
    const centroide = calcularCentroide();
    const cx = centroide.getX();
    const cy = centroide.getY();

    // Dibujar el centroide
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "red");
    svg.appendChild(circle);

    // Dibujar líneas desde el centroide a cada punto
    puntos.forEach(p => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", cx);
        line.setAttribute("y1", cy);
        line.setAttribute("x2", p.getX());
        line.setAttribute("y2", p.getY());
        line.setAttribute("stroke", "red");
        svg.appendChild(line);
    });
}

function toggleCentroide() {
    mostrarCentroide = !mostrarCentroide;
    dibujarPoligono(); // Redibujar el polígono y el centroide según el estado
}

// Llamar a la función al cargar la página
window.onload = dibujarPoligono;
