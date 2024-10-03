const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const puntos = [new Punto(50, 50), new Punto(200, 50), new Punto(200, 200), new Punto(50, 200)]; // Ejemplo

function dibujarPoligono() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }

    ctx.closePath();
    ctx.stroke();
    
    if (esConvexa(puntos)) {
        console.log("La figura es convexa");
    } else {
        console.log("La figura es cóncava");
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

let mostrarCentroide = false;

function toggleCentroide() {
    mostrarCentroide = !mostrarCentroide;
    dibujarPoligono();
    if (mostrarCentroide) {
        const centroide = calcularCentroide();
        ctx.beginPath();
        ctx.arc(centroide.getX(), centroide.getY(), 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.moveTo(centroide.getX(), centroide.getY());
        puntos.forEach(p => {
            ctx.lineTo(p.getX(), p.getY());
            ctx.moveTo(centroide.getX(), centroide.getY());
        });
        ctx.stroke();
    }
}

dibujarPoligono();