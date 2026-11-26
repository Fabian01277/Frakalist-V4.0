// =========================================================================
// MENÚ GLOBAL COMPARTIDO (Se dibuja solo en todas las carpetas)
// =========================================================================
function inicializarMenuGlobal(rutaBase = "") {
  const menuHTML = `
    <button class="btn-hamburguesa" onclick="toggleMenu()" title="Menú">☰</button>

    <div id="mini-menu" class="mini-menu">
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}index.html'">🏠 Inicio</button>
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}levels/index.html'">📋 Lista</button>
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}players/index.html'">🏆 Jugadores</button>
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}fraka-mes/index.html'">👑 Fraka del Mes</button>
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}carrera/index.html'">⚡ Carrera en Nivel</button>
      <button class="mini-menu-item" onclick="window.location.href='${rutaBase}reglas/index.html'">📜 Reglas</button>
      <hr class="mini-menu-divisor">
      <div id="zona-discord"></div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", menuHTML);
  actualizarEstadoDiscord();
}

function toggleMenu() {
  const menu = document.getElementById("mini-menu");
  if (menu) menu.classList.toggle("abierto");
}

document.addEventListener("click", function(e) {
  const menu = document.getElementById("mini-menu");
  const btn = document.querySelector(".btn-hamburguesa");
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove("abierto");
  }
});

// SESIÓN DE DISCORD
function iniciarSesionDiscord() {
  const usuario = prompt("Ingresa tu usuario de Discord del Frakaclan:");
  if (usuario && usuario.trim() !== "") {
    localStorage.setItem("fraka_discord_user", usuario.trim());
    actualizarEstadoDiscord();
  }
}

function cerrarSesionDiscord() {
  localStorage.removeItem("fraka_discord_user");
  actualizarEstadoDiscord();
}

function actualizarEstadoDiscord() {
  const zona = document.getElementById("zona-discord");
  if (!zona) return;
  const userGuardado = localStorage.getItem("fraka_discord_user");

  if (userGuardado) {
    zona.innerHTML = `
      <div style="background: rgba(88, 101, 242, 0.25); border: 1px solid #5865F2; border-radius: 10px; padding: 10px; text-align: center;">
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #c7d2fe;">Conectado como:</p>
        <strong style="font-size: 15px; color: white;">🎮 ${userGuardado}</strong>
        <button onclick="cerrarSesionDiscord()" style="background: rgba(239,68,68,0.8); color: white; font-size: 12px; padding: 5px 10px; margin-top: 8px; width: 100%; border-radius: 8px;">Cerrar sesión</button>
      </div>
    `;
  } else {
    zona.innerHTML = `
      <button class="btn-discord" onclick="iniciarSesionDiscord()">
        🎮 Iniciar sesión con Discord
      </button>
    `;
  }
}

// FÓRMULA OFICIAL DE PUNTOS (Compartida entre levels y players)
function calcularPuntosPorTop(posicion) {
  let puntos = 350 - (posicion * 40);
  if (puntos < 15) {
    puntos = 15;
  }
  return puntos;
}
