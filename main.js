const v = 0.07;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mode = "map"; // 'map' or 'catch'

/*
let pokemonList = [
  "bulbasaur","ivysaur","venusaur",
  "charmander","charmeleon","charizard",
  "squirtle","wartortle","blastoise",
  "caterpie","metapod","butterfree",
  "weedle","kakuna","beedrill",
  "pidgey","pidgeotto","pidgeot",
  "rattata","raticate","spearow","fearow",
  "ekans","arbok",
  "pikachu","raichu",
  "sandshrew","sandslash",
  "nidoran-f","nidorina","nidoqueen",
  "nidoran-m","nidorino","nidoking",
  "clefairy","clefable",
  "vulpix","ninetales",
  "jigglypuff","wigglytuff",
  "zubat","golbat",
  "oddish","gloom","vileplume",
  "paras","parasect",
  "venonat","venomoth",
  "diglett","dugtrio",
  "meowth","persian",
  "psyduck","golduck",
  "mankey","primeape",
  "growlithe","arcanine",
  "poliwag","poliwhirl","poliwrath",
  "abra","kadabra","alakazam",
  "machop","machoke","machamp",
  "bellsprout","weepinbell","victreebel",
  "tentacool","tentacruel",
  "geodude","graveler","golem",
  "ponyta","rapidash",
  "slowpoke","slowbro",
  "magnemite","magneton",
  "farfetchd",
  "doduo","dodrio",
  "seel","dewgong",
  "grimer","muk",
  "shellder","cloyster",
  "gastly","haunter","gengar",
  "onix",
  "drowzee","hypno",
  "krabby","kingler",
  "voltorb","electrode",
  "exeggcute","exeggutor",
  "cubone","marowak",
  "hitmonlee","hitmonchan",
  "lickitung",
  "koffing","weezing",
  "rhyhorn","rhydon",
  "chansey",
  "tangela",
  "kangaskhan",
  "horsea","seadra",
  "goldeen","seaking",
  "staryu","starmie",
  "mr-mime",
  "scyther",
  "jynx",
  "electabuzz",
  "magmar",
  "pinsir",
  "tauros",
  "magikarp","gyarados",
  "lapras",
  "ditto",
  "eevee","vaporeon","jolteon","flareon",
  "porygon",
  "omanyte","omastar",
  "kabuto","kabutops",
  "aerodactyl",
  "snorlax",
  "articuno","zapdos","moltres",
  "dratini","dragonair","dragonite",
  "mewtwo","mew"
];
*/

let pokemonList = ["pikachu", "bulbasaur", "charmander", "squirtle"];

let currentPokemonIndex = 0;
let selectedPokemon = pokemonList[currentPokemonIndex];

let mapImg = new Image();
mapImg.src = "assets/images/map.jpg";

let backgroundImg = new Image();
backgroundImg.src = "assets/images/background.jpg";

let pokeballImg = new Image();
pokeballImg.src = "assets/images/pokeball.png";

let pokemonImg = new Image();
pokemonImg.src = getImageURL(selectedPokemon);

function getImageURL(name) {
  return `assets/pokemon/${name}.gif`;
}

let mapPokemons = [];
let allowSpawning = true;

function spawnMapPokemon() {
  if (!allowSpawning || mode !== "map") return;

  const name = pokemonList[Math.floor(Math.random() * pokemonList.length)];
  const img = new Image();
  img.src = getImageURL(name);
  const size = 100 / 3;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);

  mapPokemons.push({
    name,
    x,
    y,
    width: size,
    height: size,
    img
  });
}

setInterval(() => {
  spawnMapPokemon();
}, 5000);

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

let pokeball = {};
let pokemon = { x: canvas.width / 2 - 50, y: 220, width: 100, height: 100 };
let caughtTextTimer = 0;
let isDragging = false;
let lastTouchAngle = null;
let lastTouchTime = null;
let lastTap = 0;
let caughtState = false;
let caughtEffectTimer = 0;
let caughtRotation = 0;

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

canvas.addEventListener("touchstart", (e) => {
  const now = new Date().getTime();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (mode === "map") {
    for (let i = 0; i < mapPokemons.length; i++) {
      const p = mapPokemons[i];
      if (
        x >= p.x &&
        x <= p.x + p.width &&
        y >= p.y &&
        y <= p.y + p.height
      ) {
        selectedPokemon = p.name;
        pokemonImg.src = getImageURL(selectedPokemon);
        mode = "catch";
        allowSpawning = false;
        mapPokemons.splice(i, 1); // Ta bort den valda från kartan
        resetGame();
        return;
      }
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

    for (const p of mapPokemons) {
      ctx.drawImage(p.img, p.x, p.y, p.width, p.height);
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
          loadNextPokemon();
          allowSpawning = true;
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
