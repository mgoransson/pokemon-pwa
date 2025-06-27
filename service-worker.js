const CACHE_NAME = 'pokemon-go-pwa-v1.01';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/images/pokemon/bulbasaur.gif',
  '/assets/images/pokemon/ivysaur.gif',
  '/assets/images/pokemon/venusaur.gif',
  '/assets/images/pokemon/charmander.gif',
  '/assets/images/pokemon/charmeleon.gif',
  '/assets/images/pokemon/charizard.gif',
  '/assets/images/pokemon/squirtle.gif',
  '/assets/images/pokemon/wartortle.gif',
  '/assets/images/pokemon/blastoise.gif',
  '/assets/images/pokemon/caterpie.gif',
  '/assets/images/pokemon/metapod.gif',
  '/assets/images/pokemon/butterfree.gif',
  '/assets/images/pokemon/weedle.gif',
  '/assets/images/pokemon/kakuna.gif',
  '/assets/images/pokemon/beedrill.gif',
  '/assets/images/pokemon/pidgey.gif',
  '/assets/images/pokemon/pidgeotto.gif',
  '/assets/images/pokemon/pidgeot.gif',
  '/assets/images/pokemon/rattata.gif',
  '/assets/images/pokemon/raticate.gif',
  '/assets/images/pokemon/spearow.gif',
  '/assets/images/pokemon/fearow.gif',
  '/assets/images/pokemon/ekans.gif',
  '/assets/images/pokemon/arbok.gif',
  '/assets/images/pokemon/pikachu.gif',
  '/assets/images/pokemon/raichu.gif',
  '/assets/images/pokemon/sandshrew.gif',
  '/assets/images/pokemon/sandslash.gif',
  '/assets/images/pokemon/nidoran-f.gif',
  '/assets/images/pokemon/nidorina.gif',
  '/assets/images/pokemon/nidoqueen.gif',
  '/assets/images/pokemon/nidoran-m.gif',
  '/assets/images/pokemon/nidorino.gif',
  '/assets/images/pokemon/nidoking.gif',
  '/assets/images/pokemon/clefairy.gif',
  '/assets/images/pokemon/clefable.gif',
  '/assets/images/pokemon/vulpix.gif',
  '/assets/images/pokemon/ninetales.gif',
  '/assets/images/pokemon/jigglypuff.gif',
  '/assets/images/pokemon/wigglytuff.gif',
  '/assets/images/pokemon/zubat.gif',
  '/assets/images/pokemon/golbat.gif',
  '/assets/images/pokemon/oddish.gif',
  '/assets/images/pokemon/gloom.gif',
  '/assets/images/pokemon/vileplume.gif',
  '/assets/images/pokemon/paras.gif',
  '/assets/images/pokemon/parasect.gif',
  '/assets/images/pokemon/venonat.gif',
  '/assets/images/pokemon/venomoth.gif',
  '/assets/images/pokemon/diglett.gif',
  '/assets/images/pokemon/dugtrio.gif',
  '/assets/images/pokemon/meowth.gif',
  '/assets/images/pokemon/persian.gif',
  '/assets/images/pokemon/psyduck.gif',
  '/assets/images/pokemon/golduck.gif',
  '/assets/images/pokemon/mankey.gif',
  '/assets/images/pokemon/primeape.gif',
  '/assets/images/pokemon/growlithe.gif',
  '/assets/images/pokemon/arcanine.gif',
  '/assets/images/pokemon/poliwag.gif',
  '/assets/images/pokemon/poliwhirl.gif',
  '/assets/images/pokemon/poliwrath.gif',
  '/assets/images/pokemon/abra.gif',
  '/assets/images/pokemon/kadabra.gif',
  '/assets/images/pokemon/alakazam.gif',
  '/assets/images/pokemon/machop.gif',
  '/assets/images/pokemon/machoke.gif',
  '/assets/images/pokemon/machamp.gif',
  '/assets/images/pokemon/bellsprout.gif',
  '/assets/images/pokemon/weepinbell.gif',
  '/assets/images/pokemon/victreebel.gif',
  '/assets/images/pokemon/tentacool.gif',
  '/assets/images/pokemon/tentacruel.gif',
  '/assets/images/pokemon/geodude.gif',
  '/assets/images/pokemon/graveler.gif',
  '/assets/images/pokemon/golem.gif',
  '/assets/images/pokemon/ponyta.gif',
  '/assets/images/pokemon/rapidash.gif',
  '/assets/images/pokemon/slowpoke.gif',
  '/assets/images/pokemon/slowbro.gif',
  '/assets/images/pokemon/magnemite.gif',
  '/assets/images/pokemon/magneton.gif',
  '/assets/images/pokemon/farfetchd.gif',
  '/assets/images/pokemon/doduo.gif',
  '/assets/images/pokemon/dodrio.gif',
  '/assets/images/pokemon/seel.gif',
  '/assets/images/pokemon/dewgong.gif',
  '/assets/images/pokemon/grimer.gif',
  '/assets/images/pokemon/muk.gif',
  '/assets/images/pokemon/shellder.gif',
  '/assets/images/pokemon/cloyster.gif',
  '/assets/images/pokemon/gastly.gif',
  '/assets/images/pokemon/haunter.gif',
  '/assets/images/pokemon/gengar.gif',
  '/assets/images/pokemon/onix.gif',
  '/assets/images/pokemon/drowzee.gif',
  '/assets/images/pokemon/hypno.gif',
  '/assets/images/pokemon/krabby.gif',
  '/assets/images/pokemon/kingler.gif',
  '/assets/images/pokemon/voltorb.gif',
  '/assets/images/pokemon/electrode.gif',
  '/assets/images/pokemon/exeggcute.gif',
  '/assets/images/pokemon/exeggutor.gif',
  '/assets/images/pokemon/cubone.gif',
  '/assets/images/pokemon/marowak.gif',
  '/assets/images/pokemon/hitmonlee.gif',
  '/assets/images/pokemon/hitmonchan.gif',
  '/assets/images/pokemon/lickitung.gif',
  '/assets/images/pokemon/koffing.gif',
  '/assets/images/pokemon/weezing.gif',
  '/assets/images/pokemon/rhyhorn.gif',
  '/assets/images/pokemon/rhydon.gif',
  '/assets/images/pokemon/chansey.gif',
  '/assets/images/pokemon/tangela.gif',
  '/assets/images/pokemon/kangaskhan.gif',
  '/assets/images/pokemon/horsea.gif',
  '/assets/images/pokemon/seadra.gif',
  '/assets/images/pokemon/goldeen.gif',
  '/assets/images/pokemon/seaking.gif',
  '/assets/images/pokemon/staryu.gif',
  '/assets/images/pokemon/starmie.gif',
  '/assets/images/pokemon/mr-mime.gif',
  '/assets/images/pokemon/scyther.gif',
  '/assets/images/pokemon/jynx.gif',
  '/assets/images/pokemon/electabuzz.gif',
  '/assets/images/pokemon/magmar.gif',
  '/assets/images/pokemon/pinsir.gif',
  '/assets/images/pokemon/tauros.gif',
  '/assets/images/pokemon/magikarp.gif',
  '/assets/images/pokemon/gyarados.gif',
  '/assets/images/pokemon/lapras.gif',
  '/assets/images/pokemon/ditto.gif',
  '/assets/images/pokemon/eevee.gif',
  '/assets/images/pokemon/vaporeon.gif',
  '/assets/images/pokemon/jolteon.gif',
  '/assets/images/pokemon/flareon.gif',
  '/assets/images/pokemon/porygon.gif',
  '/assets/images/pokemon/omanyte.gif',
  '/assets/images/pokemon/omastar.gif',
  '/assets/images/pokemon/kabuto.gif',
  '/assets/images/pokemon/kabutops.gif',
  '/assets/images/pokemon/aerodactyl.gif',
  '/assets/images/pokemon/snorlax.gif',
  '/assets/images/pokemon/articuno.gif',
  '/assets/images/pokemon/zapdos.gif',
  '/assets/images/pokemon/moltres.gif',
  '/assets/images/pokemon/dratini.gif',
  '/assets/images/pokemon/dragonair.gif',
  '/assets/images/pokemon/dragonite.gif',
  '/assets/images/pokemon/mewtwo.gif',
  '/assets/images/pokemon/mew.gif',
  '/assets/images/pokeball.png',
  '/assets/images/map.jpg',
  '/assets/images/background.jpg',
  // lägg till fler assets och pokemon-gifs här
];

// Install-eventet: cacha viktiga filer
self.addEventListener('install', event => {
  console.log('ServiceWorker installerad och cachear assets');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch-eventet: svara från cache om möjligt, annars från nätet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});

// Optional: rensa gammal cache vid aktivering
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
