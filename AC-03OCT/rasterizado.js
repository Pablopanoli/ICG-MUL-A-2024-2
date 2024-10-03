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
const puntos = [
    new Punto(50, 50),
    new Punto(200, 50),
    new Punto(200, 200),
    new Punto(50, 200),
    new Punto(100, 150) // Agregamos un punto adicional para crear un polígono cóncavo
];

let mostrarCentroide = false;

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
    if (mostrarCentroide) {
        const centroide = calcularCentroide();
        ctx.beginPath();
        ctx.arc(centroide.getX(), centroide.getY(), 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "red";
        puntos.forEach(p => {
            ctx.moveTo(centroide.getX(), centroide.getY());
            ctx.lineTo(p.getX(), p.getY());
        });
        ctx.stroke();
    }
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

// Inicializar dibujo
dibujarPoligono();


function esConvexa(puntos) {
    // Implementa aquí la lógica para determinar si el polígono es convexo o no
    return true; // Cambia esto según la implementación
}

// Inicializa el polígono al cargar la página
dibujarPoligono();
