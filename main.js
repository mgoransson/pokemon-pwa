const v = 0.01;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mode = "map"; // 'map' or 'catch'

let pokemonList = ["pikachu", "bulbasaur", "charmander"];
let currentPokemonIndex = 0;
let selectedPokemon = pokemonList[currentPokemonIndex];

let mapImg = new Image();
mapImg.src = "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*jc9FPbRF6vg26qGO.jpg";

let backgroundImg = new Image();
backgroundImg.src = "https://preview.redd.it/2-days-in-a-row-v0-jg8blkd3cse91.jpg?width=640&crop=smart&auto=webp&s=6b3cded6b28dc6422ab4b451c6904f3ccdfeceee";

let pokeballImg = new Image();
pokeballImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

let pokemonImg = new Image();
pokemonImg.src = getImageURL(selectedPokemon);

let mapPokemonVisible = false;
let mapPokemon = {
  x: 0,
  y: 0,
  width: 33,
  height: 33
};

let mapPokemonTimer;

function getImageURL(name) {
  return `https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`;
}

function spawnMapPokemon() {
  const size = 100 / 3;
  mapPokemon = {
    x: Math.random() * (canvas.width - size),
    y: Math.random() * (canvas.height - size),
    width: size,
    height: size
  };
  mapPokemonVisible = true;
}

function scheduleNextMapPokemon() {
  clearTimeout(mapPokemonTimer);
  mapPokemonTimer = setTimeout(() => {
    if (mode === "map") {
      spawnMapPokemon();
      scheduleNextMapPokemon();
    }
  }, 5000);
}

function resetGame() {
  pokeball = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    baseSize: 30,
    scale: 5,
    isMoving: false,
    vx: 0,
    vy: 0,
    rotation: 0,
    rotationSpeed: 0,
  };
  isDragging = false;
  caughtTextTimer = 0;
  lastTouchAngle = null;
  lastTouchTime = null;
  caughtState = false;
  caughtEffectTimer = 0;
  caughtRotation = 0;
  pokemonImg.src = getImageURL(selectedPokemon);
}

function loadNextPokemon() {
  currentPokemonIndex = (currentPokemonIndex + 1) % pokemonList.length;
  selectedPokemon = pokemonList[currentPokemonIndex];
  pokemonImg.src = getImageURL(selectedPokemon);
  resetGame();
}

let pokeball;
let pokemon = { x: canvas.width / 2 - 50, y: 220, width: 100, height: 100 };
let caughtTextTimer = 0;
let isDragging = false;
let lastTouchAngle = null;
let lastTouchTime = null;
let lastTap = 0;
let caughtState = false;
let caughtEffectTimer = 0;
let caughtRotation = 0;

resetGame();

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

canvas.addEventListener("touchstart", (e) => {
  const now = new Date().getTime();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (mode === "map" && mapPokemonVisible) {
    if (
      x >= mapPokemon.x &&
      x <= mapPokemon.x + mapPokemon.width &&
      y >= mapPokemon.y &&
      y <= mapPokemon.y + mapPokemon.height
    ) {
      mode = "catch";
      mapPokemonVisible = false;
      clearTimeout(mapPokemonTimer);
      resetGame();
    }
  } else if (mode === "catch") {
    if (now - lastTap < 300) {
      resetGame();
      return;
    }
    lastTap = now;

    const dx = x - pokeball.x;
    const dy = y - pokeball.y;

    if (Math.sqrt(dx * dx + dy * dy) < pokeball.baseSize * pokeball.scale) {
      isDragging = true;
      lastTouchAngle = getAngle(pokeball.x, pokeball.y, x, y);
      lastTouchTime = now;
    }
  }
});

canvas.addEventListener("touchmove", (e) => {
  if (mode !== "catch" || !isDragging) return;

  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  pokeball.x = x;
  pokeball.y = y;

  const currentAngle = getAngle(pokeball.x, pokeball.y, x, y);
  const now = new Date().getTime();

  if (lastTouchAngle !== null && lastTouchTime !== null) {
    const deltaAngle = currentAngle - lastTouchAngle;
    let adjustedDelta = deltaAngle;
    if (deltaAngle > Math.PI) adjustedDelta = deltaAngle - 2 * Math.PI;
    else if (deltaAngle < -Math.PI) adjustedDelta = deltaAngle + 2 * Math.PI;

    const deltaTime = (now - lastTouchTime) / 1000;
    if (deltaTime > 0) {
      const speed = adjustedDelta / deltaTime;
      pokeball.rotationSpeed += speed * 0.05;
      const maxSpeed = 1.5;
      if (pokeball.rotationSpeed > maxSpeed) pokeball.rotationSpeed = maxSpeed;
      else if (pokeball.rotationSpeed < -maxSpeed) pokeball.rotationSpeed = -maxSpeed;
    }
  }

  lastTouchAngle = currentAngle;
  lastTouchTime = now;
});

canvas.addEventListener("touchend", () => {
  if (mode !== "catch" || !isDragging) return;

  const dx = (pokemon.x + pokemon.width / 2) - pokeball.x;
  const dy = (pokemon.y + pokemon.height / 2) - pokeball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const minTime = 0.5;
  const maxTime = 1.8;

  const normDist = Math.min(Math.max(distance, 100), 400);
  const time = minTime + (maxTime - minTime) * Math.pow((normDist - 100) / (400 - 100), 2);
  const speed = distance / (time * 60);

  pokeball.vx = (dx / distance) * speed;
  pokeball.vy = (dy / distance) * speed;

  pokeball.isMoving = true;
  isDragging = false;
  lastTouchAngle = null;
  lastTouchTime = null;
});

function updateBallScale() {
  const startY = canvas.height - 100;
  const endY = pokemon.y + pokemon.height / 2;
  const totalDistance = startY - endY;
  const currentDistance = pokeball.y - endY;

  let progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
  progress = Math.pow(progress, 0.5);

  const maxScale = 5;
  const minScale = 1.5;
  pokeball.scale = minScale + (maxScale - minScale) * progress;
}

function drawCaughtEffect() {
  const maxRadius = 70;
  const progress = caughtEffectTimer / 60;
  const radius = maxRadius * (1 - progress);
  const alpha = 1 - progress;

  ctx.save();
  ctx.beginPath();
  ctx.arc(pokeball.x, pokeball.y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
  ctx.lineWidth = 6 * alpha;
  ctx.shadowColor = `rgba(255, 215, 0, ${alpha})`;
  ctx.shadowBlur = 20 * alpha;
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mode === "map") {
    ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
    if (mapPokemonVisible) {
      ctx.drawImage(pokemonImg, mapPokemon.x, mapPokemon.y, mapPokemon.width, mapPokemon.height);
    }
  } else if (mode === "catch") {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    if (caughtState) {
      const size = pokeball.baseSize * pokeball.scale;
      ctx.save();
      ctx.translate(pokeball.x, pokeball.y);
      ctx.rotate(caughtRotation);
      ctx.drawImage(pokeballImg, -size / 2, -size / 2, size, size);
      ctx.restore();

      if (caughtEffectTimer > 0) {
        drawCaughtEffect();
        caughtEffectTimer--;
      } else {
        setTimeout(() => {
          mode = "map";
          setTimeout(() => {
            loadNextPokemon();
            spawnMapPokemon();
            scheduleNextMapPokemon();
          }, 3000 + Math.random() * 2000);
        }, 500);
        caughtState = false;
      }
    } else {
      ctx.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);

      const size = pokeball.baseSize * pokeball.scale;
      ctx.save();
      ctx.translate(pokeball.x, pokeball.y);
      ctx.rotate(pokeball.rotation);
      ctx.drawImage(pokeballImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    if (pokeball.isMoving) {
      pokeball.x += pokeball.vx;
      pokeball.y += pokeball.vy;
      updateBallScale();

      pokeball.rotation += pokeball.rotationSpeed;
      pokeball.rotationSpeed *= 0.95;

      const centerX = pokemon.x + pokemon.width / 2;
      const centerY = pokemon.y + pokemon.height / 2;
      const dx = pokeball.x - centerX;
      const dy = pokeball.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const hitRadius = 50;
      if (distance < hitRadius) {
        pokeball.isMoving = false;
        caughtState = true;
        caughtEffectTimer = 60;
        caughtRotation = 0;
        pokeball.rotationSpeed = 0;
        pokeball.vx = 0;
        pokeball.vy = 0;
        pokeball.x = centerX;
        pokeball.y = centerY;
        pokeball.scale = 5;
      }

      if (
        pokeball.y < 0 ||
        pokeball.x < 0 ||
        pokeball.x > canvas.width ||
        pokeball.y > canvas.height
      ) {
        pokeball.isMoving = false;
        pokeball.rotationSpeed = 0;
        setTimeout(resetGame, 1000);
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
if (mode === "map") {
  spawnMapPokemon();
  scheduleNextMapPokemon();
}

