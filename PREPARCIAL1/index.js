<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dibujar Polígonos Regulares</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        canvas {
            border: 1px solid #000;
        }
    </style>
</head>
<body>
    <h1>Trazada de Polígonos Regulares</h1>
    <form id="polygon-form">
        <label for="n">Número de lados:</label>
        <input type="number" id="n" min="3" max="100" value="5" required>
        <br><br>
        <label for="l">Longitud de lado (px):</label>
        <input type="number" id="l" min="10" value="100" required>
        <br><br>
        <button type="button" onclick="drawPolygon()">Dibujar Polígono</button>
        <button type="button" id="clear" onclick="clearCanvas()">Reiniciar</button>
    </form>
    <br>
    <canvas id="polygonCanvas" width="800" height="600"></canvas>

    <script>
        function drawPolygon() {
            const n = parseInt(document.getElementById('n').value);
            const l = parseInt(document.getElementById('l').value);
            const canvas = document.getElementById('polygonCanvas');
            const ctx = canvas.getContext('2d');

            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (n < 3) return; // No dibujar si hay menos de 3 lados

            // Calcular el radio del círculo circunscrito
            const radius = l / (2 * Math.sin(Math.PI / n));

            // Calcular el centro del canvas
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Ángulo inicial para que el vértice esté hacia arriba
            const startAngle = -Math.PI / 2;

            ctx.beginPath();
            for (let i = 0; i < n; i++) {
                // Ajustar el ángulo inicial para que el polígono esté centrado con un vértice hacia arriba
                const angle = startAngle + (2 * Math.PI / n) * i;
                
                // Convertir coordenadas polares a cartesianas
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }

        function clearCanvas() {
            const canvas = document.getElementById('polygonCanvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    </script>
</body>
</html>