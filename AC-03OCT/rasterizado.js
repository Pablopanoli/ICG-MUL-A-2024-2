class Punto {
    constructor(x, y) {
        this._x = x; // Encapsulamiento
        this._y = y; // Encapsulamiento
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let puntos = [];
let mostrarCentroide = false;

function generarPoligonoAleatorio() {
    puntos = [];
    const numPuntos = Math.floor(Math.random() * 5) + 3; // Generar entre 3 y 7 puntos

    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * 400 + 50; // Coordenadas dentro del área del canvas
        const y = Math.random() * 400 + 50;
        puntos.push(new Punto(x, y));
    }

    dibujarPoligono(); // Dibujar el nuevo polígono
}

function dibujarPoligono() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }

    ctx.closePath();
    ctx.stroke();

    // Determinar el tipo de polígono
    const tipo = esConvexa(puntos) ? "convexa" : "cóncava";
    document.getElementById('tipoPoligono').innerText = `La figura es ${tipo}.`;

    if (mostrarCentroide) {
        dibujarCentroide();
    }
}

function calcularCentroide() {
    let cx = 0, cy = 0;
    puntos.forEach(p => {
        cx += p.getX();
        cy += p.getY();
    });
    return new Punto(cx / puntos.length, cy / puntos.length);
}

function toggleCentroide() {
    mostrarCentroide = !mostrarCentroide;
    dibujarPoligono();
}

function dibujarCentroide() {
    const centroide = calcularCentroide();
    const cx = centroide.getX();
    const cy = centroide.getY();

    // Dibujar el centroide
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    // Dibujar líneas desde el centroide a cada punto
    ctx.strokeStyle = "red";
    puntos.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.getX(), p.getY());
        ctx.stroke();
    });
}

function esConvexa(puntos) {
    let signo = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const dx1 = p2.getX() - p1.getX();
        const dy1 = p2.getY() - p1.getY();
        const dx2 = p3.getX() - p2.getX();
        const dy2 = p3.getY() - p2.getY();

        const cruce = dx1 * dy2 - dy1 * dx2;

        if (cruce !== 0) {
            const nuevoSigno = cruce > 0 ? 1 : -1;
            if (signo === 0) {
                signo = nuevoSigno;
            } else if (signo !== nuevoSigno) {
                return false; // Encontrado un cambio de signo, el polígono es cóncavo
            }
        }
    }
    return true; // No se encontraron cambios de signo, el polígono es convexo
}

// Inicializar con un polígono aleatorio
generarPoligonoAleatorio();
