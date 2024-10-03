const svg = document.getElementById('svg');
const puntos = [new Punto(50, 50), new Punto(200, 50), new Punto(200, 200), new Punto(50, 200)]; // Ejemplo

function dibujarPoligono() {
    svg.innerHTML = '';
    let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;

    for (let i = 1; i < puntos.length; i++) {
        pathData += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
    }

    pathData += ' Z';

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
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", centroide.getX());
        circle.setAttribute("cy", centroide.getY());
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "red");
        svg.appendChild(circle);
        
        puntos.forEach(p => {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", centroide.getX());
            line.setAttribute("y1", centroide.getY());
            line.setAttribute("x2", p.getX());
            line.setAttribute("y2", p.getY());
            line.setAttribute("stroke", "red");
            svg.appendChild(line);
        });
    }
}

dibujarPoligono();