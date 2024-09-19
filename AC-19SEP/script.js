 <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dibujo SVG Dinámico</title>
</head>
<body>
    <svg id="svgCanvas" width="600" height="400" style="border:1px solid #000;"></svg>

    <script>
        // Función para crear un elemento SVG
        function crearElemento(tag, attributes) {
            const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key, value);
            }
            return element;
        }

        // Función para dibujar formas
        function dibujarForma(tipo, params) {
            let forma;
            if (tipo === 'line') {
                forma = crearElemento('line', {
                    x1: params.x1,
                    y1: params.y1,
                    x2: params.x2,
                    y2: params.y2,
                    stroke: 'black',
                    'stroke-width': 2
                });
            } else if (tipo === 'circle') {
                forma = crearElemento('circle', {
                    cx: params.cx,
                    cy: params.cy,
                    r: params.r,
                    stroke: 'blue',
                    'stroke-width': 2,
                    fill: 'none'
                });
            } else if (tipo === 'ellipse') {
                forma = crearElemento('ellipse', {
                    cx: params.cx,
                    cy: params.cy,
                    rx: params.rx,
                    ry: params.ry,
                    stroke: 'red',
                    'stroke-width': 2,
                    fill: 'none'
                });
            }
            return forma;
        }

        // Crear el SVG
        const svgCanvas = document.getElementById('svgCanvas');

        // Dibujar las primitivas
        svgCanvas.appendChild(dibujarForma('line', { x1: 50, y1: 50, x2: 200, y2: 200 }));
        svgCanvas.appendChild(dibujarForma('circle', { cx: 300, cy: 100, r: 50 }));
        svgCanvas.appendChild(dibujarForma('ellipse', { cx: 400, cy: 300, rx: 80, ry: 50 }));
    </script>
</body>
</html>
