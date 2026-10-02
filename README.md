# Constelación — VJ Tool

Instrumento visual interactivo en tiempo real desarrollado con **Three.js**, física de **Flocking (Boids)**, **Flow Fields**, y reactividad mediante la **Web Audio API** sintonizada al archivo del proyecto **`Constelación.mp3`**.

---

## 🎵 Funcionamiento de UI y Audio

1. **Pantalla Limpia Inicial**: Al cargar la página solo verás la pantalla negra con el mensaje de inicio. La interfaz de monitoreo (`lil-gui`), la barra de progreso y la barra de atajos están ocultas por defecto.
2. **Inicio por Click**: Al hacer click en cualquier parte de la pantalla:
   - Se inicia la música `Constelacion.mp3`.
   - Se activa la física de movimiento de partículas.
   - **Aparece la barra de progreso interactiva** en la parte inferior para seguir el tiempo del tema y saltar a cualquier punto durante los ensayos.
   - **Aparece el panel flotante de monitoreo** (`lil-gui`) en la esquina superior derecha con indicador de tiempo.
3. **Modo Performance (Tecla `P`)**: Presiona la tecla **`P`** en cualquier momento de la interpretación para ocultar / mostrar instantáneamente toda la interfaz visual (`lil-gui`, barra de progreso y texto de atajos) para un show en vivo 100% limpio.

---

## 🚀 Cómo Ejecutar con Node.js

```bash
npm start
```
*(O `node server.js`)*

El servidor iniciará en `http://localhost:3000`.

---

## 🌐 Cómo Desplegar en GitHub Pages

Este proyecto utiliza **HTML5/WebGL estático** y librerías CDN por lo que no requiere servidor backend en producción. Se despliega automáticamente en **GitHub Pages**.

### Opción A: Despliegue Automático con GitHub Actions (Recomendado)

1. Sube tu código a tu repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Constelacion VJ Tool"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, ve a **Settings** > **Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push`, GitHub desplegará automáticamente la aplicación.

### Opción B: Despliegue Manual con NPM (`gh-pages`)

1. Asegúrate de estar autenticado en Git y ejecuta:
   ```bash
   npm run deploy
   ```
2. Este comando publicará automáticamente los archivos estáticos en la rama `gh-pages` de tu repositorio.

### Opción C: Despliegue Directo desde la Rama Main / Master

1. Sube el código a GitHub.
2. En tu repositorio, ve a **Settings** > **Pages**.
3. En **Source**, selecciona `Deploy from a branch`.
4. Elige la rama `main` (o `master`) y la carpeta `/ (root)`. Guarda los cambios.
5. Tu sitio estará disponible en: `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

---

## 🎛️ Guía de Interpretación en Vivo (Atajos de Teclado)

| Tecla | Estado | Descripción y Comportamiento Físico/Visual |
| :---: | :--- | :--- |
| **`P`** | **Modo Performance** | **Ocultar / Mostrar toda la UI para show limpio en vivo** |
| **`0`** | **Intro** | Físicas en reposo, estrellas estáticas titilando al ritmo del audio |
| **`1`** | **Enojado** | Separación extrema, velocidad alta, líneas rojizas rompiéndose |
| **`2`** | **Reprimido** | Cohesión masiva, red condensada vibrando en el centro |
| **`3`** | **Decidido** | Alineación al 100%, flujo direccional constante en grilla |
| **`4`** | **Cuidar al otro** | Grupo central protegido con escudo orbital de líneas |
| **`5`** | **Sol / Estribillo** | Aparece una estrella central resplandeciente con órbita circular armónica |
| **`6`** | **Tranquilo** | Flocking fluido con ruido Perlin suave como corriente de agua |
| **`7`** | **Dos en sintonía** | Dos cadenas de boids cruzándose en doble hélice senoidal |
| **`8`** | **Hacer daño** | Separación negativa; los boids colisionan bruscamente entre sí |
| **`9`** | **Volver a creer** | Transición lenta, aparición de líneas doradas cálidas |
| **`Q`** | **Agradecimiento - El Halo** | Órbita concéntrica en espiral suave (halo dorado a r=14.0) sin tocar bordes |
| **`W`** | **Amarga realidad** | Gravedad vertical hacia abajo (caída libre de estrellas) |
| **`E`** | **Alejarse** | Expansión centrífuga suave con desvanecimiento gradual de opacidad |
| **`Y`** | **Incertidumbre / Falsos Contactos** | Frena repulsión (vel ≈ 0), opacidad tenue de partículas y parpadeo/chispas eléctricas de alta frecuencia en líneas |
| **`R`** | **No puedo sin vos** | Cero cohesión/alineación, movimiento caótico/browniano de alta velocidad |
| **`T`** | **Outro** | Congelamiento progresivo de velocidades y fade-out total a negro |
| **`A`** | **Frío Pasado** | Velocidad casi en 0, Flow Field estático, líneas azul hielo congeladas |
| **`S`** | **Fuck Love / Quiebre** | Cohesión en 0, separación 100%, estallido de velocidad impulsivo hacia afuera |
| **`D`** | **Apagón Mental** | Opacidad de líneas a 0 instantáneamente, partículas a la deriva lenta sin conexiones |
| **`F`** | **Renuncia** | Fuerzas opuestas empujan Grupo A a la izq (-X) y Grupo B a la der (+X), vaciando el centro |
| **`G`** | **Arrepentimiento** | Flow Field diagonal pesado (-X, -Y), velocidad baja y alta cohesión con alineación 0 |
| **`H`** | **Imanes Oxidados** | Cohesión y separación altísimas e iguales, generando temblor/vibración constante |
| **`J`** | **El Escudo / Rebotes Armónicos** | Órbita suave y elegante del Grupo A (r=10); Grupo B fluye armoniosamente al centro y rebota elásticamente al tocar el escudo |
| **`K`** | **Cuesta Arriba** | Flow Field hacia abajo (-Y) pero alineación estrictamente hacia arriba (+Y), subiendo milimétricamente |
| **`Z`** | **El Latido** | Flow Field radial pulsante con pulso senoidal y flashes rojo/magenta en las líneas ("lub-dub") |
| **`X`** | **El Borrón** | Cohesión 0, ráfaga horizontal extrema (+X/-X) que barre y rompe la red |
| **`C`** | **La Burbuja** | Cámara lenta, flow circular perfecto, líneas doradas/blancas flotando en equilibrio |

---

## 🎧 Audio-Reactividad
- **Estrellas Pares**: Crecen y escalan con los **bajos** (Kick / Bass).
- **Estrellas Impares**: Crecen y titilan con los **agudos** (Hi-Hats / Voces).
- **Líneas**: Su transparencia reacciona al volumen maestro de la canción.
