<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor de Figuras</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        h1 {
            margin-top: 20px;
        }

        .controls {
            margin: 20px;
        }

        .controls label {
            margin-right: 10px;
        }

        .controls input,
        .controls select {
            margin-right: 10px;
        }

        .canvases {
            margin: 20px;
            display: flex;
            justify-content: space-around;
        }

        canvas, svg {
            border: 1px solid #000;
            background-color: #fff;
            width: 600px;
            height: 400px;
        }
    </style>
</head>
<body>
    <h1>Editor de Figuras</h1>
    
    <div class="controls">
        <label for="format">Selecciona el formato:</label>
        <select id="format">
            <option value="svg">SVG</option>
            <option value="canvas">Canvas</option>
        </select>
        
        <label for="shape">Selecciona una figura:</label>
        <select id="shape">
            <option value="circle">Círculo</option>
            <option value="rectangle">Rectángulo</option>
            <option value="square">Cuadrado</option>
            <option value="triangle">Triángulo</option>
        </select>
        
        <label for="color">Color de relleno:</label>
        <input type="color" id="color" value="#ff0000">
        
        <label for="border">Color del borde:</label>
        <input type="color" id="border" value="#000000">
        
        <label for="border-width">Ancho del borde:</label>
        <input type="number" id="border-width" value="2">
        
        <label for="width">Ancho (solo para rectángulo y cuadrado):</label>
        <input type="number" id="width" value="100">
        
        <label for="height">Alto (solo para rectángulo):</label>
        <input type="number" id="height" value="100">
        
        <label for="radius">Radio (solo para círculo):</label>
        <input type="number" id="radius" value="50">
        
        <label for="x">Posición X:</label>
        <input type="number" id="x" value="10">
        
        <label for="y">Posición Y:</label>
        <input type="number" id="y" value="10">
        
        <button id="draw">Dibujar</button>
        <button id="clear">Reiniciar</button>
    </div>
    
    <div class="canvases">
        <svg id="svgCanvas"></svg>
        <canvas id="canvas"></canvas>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const formatSelect = document.getElementById('format');
            const shapeSelect = document.getElementById('shape');
            const colorInput = document.getElementById('color');
            const borderInput = document.getElementById('border');
            const borderWidthInput = document.getElementById('border-width');
            const widthInput = document.getElementById('width');
            const heightInput = document.getElementById('height');
            const radiusInput = document.getElementById('radius');
            const xInput = document.getElementById('x');
            const yInput = document.getElementById('y');
            const drawButton = document.getElementById('draw');
            const clearButton = document.getElementById('clear');
            
            const svgCanvas = document.getElementById('svgCanvas');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 600;
            canvas.height = 400;

            function drawShape() {
                const format = formatSelect.value;
                const shape = shapeSelect.value;
                const fillColor = colorInput.value;
                const borderColor = borderInput.value;
                const borderWidth = parseInt(borderWidthInput.value, 10);
                const width = parseInt(widthInput.value, 10);
                const height = parseInt(heightInput.value, 10);
                const radius = parseInt(radiusInput.value, 10);
                const x = parseInt(xInput.value, 10);
                const y = parseInt(yInput.value, 10);

                if (format === 'svg') {
                    let shapeElement;

                    if (shape === 'circle') {
                        shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        shapeElement.setAttribute('cx', x + radius);
                        shapeElement.setAttribute('cy', y + radius);
                        shapeElement.setAttribute('r', radius);
                    } else if (shape === 'rectangle' || shape === 'square') {
                        shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        shapeElement.setAttribute('x', x);
                        shapeElement.setAttribute('y', y);
                        shapeElement.setAttribute('width', width);
                        shapeElement.setAttribute('height', height);
                    } else if (shape === 'triangle') {
                        shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                        shapeElement.setAttribute('points', `${x},${y} ${x + width},${y} ${x + width / 2},${y - height}`);
                    }

                    shapeElement.setAttribute('fill', fillColor);
                    shapeElement.setAttribute('stroke', borderColor);
                    shapeElement.setAttribute('stroke-width', borderWidth);
                    
                    svgCanvas.appendChild(shapeElement);
                } else if (format === 'canvas') {
                    if (shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fillStyle = fillColor;
                        ctx.strokeStyle = borderColor;
                        ctx.lineWidth = borderWidth;
                        ctx.fill();
                        ctx.stroke();
                    } else if (shape === 'rectangle' || shape === 'square') {
                        ctx.fillStyle = fillColor;
                        ctx.strokeStyle = borderColor;
                        ctx.lineWidth = borderWidth;
                        ctx.fillRect(x, y, width, height);
                        ctx.strokeRect(x, y, width, height);
                    } else if (shape === 'triangle') {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + width, y);
                        ctx.lineTo(x + width / 2, y - height);
                        ctx.closePath();
                        ctx.fillStyle = fillColor;
                        ctx.strokeStyle = borderColor;
                        ctx.lineWidth = borderWidth;
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
            
            function clearCanvas() {
                svgCanvas.innerHTML = ''; // Clear the SVG canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the Canvas
            }
            
            drawButton.addEventListener('click', drawShape);
            clearButton.addEventListener('click', clearCanvas);
        });
    </script>
</body>
</html>