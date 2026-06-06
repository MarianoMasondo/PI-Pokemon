<script setup>
import vueLogo from "@/assets/vue-logo.png";
</script>

<template>
  <main class="landing-page">
    <div class="background-glow red-glow"></div>
    <div class="background-glow blue-glow"></div>

    <section class="landing-container">
      <header class="landing-header">
        <div class="brand">
          <span class="pokeball" aria-hidden="true"></span>

          <div>
            <strong>Pokémon</strong>

            <div class="vue-edition">
              <img :src="vueLogo" alt="Vue" />
              <small>Vue Edition</small>
            </div>
          </div>
        </div>

        <span class="project-badge"> Full Stack App </span>
      </header>

      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">Explorá. Compará. Creá.</p>

          <h1>
            Tu Pokédex,
            <span>más completa.</span>
          </h1>

          <p class="hero-description">
            Descubrí Pokémon, filtrá resultados, consultá sus estadísticas y
            agregá tus propias creaciones a la colección.
          </p>

          <div class="hero-actions">
            <RouterLink class="primary-button" to="/home">
              Explorar Pokémons
              <span>→</span>
            </RouterLink>
          </div>
        </div>

        <div class="hero-visual">
          <div class="orbit"></div>

          <article class="pokemon-card">
            <div class="card-top">
              <span>#001</span>
              <span class="api-badge">API</span>
            </div>

            <div class="pokemon-stage">
              <div class="pokemon-glow"></div>

              <img
                class="featured-pokemon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="Bulbasaur"
              />
            </div>

            <div class="card-bottom">
              <div>
                <small>Pokémon inicial</small>
                <strong>Bulbasaur</strong>
              </div>

              <span class="type-badge"> Grass </span>
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.landing-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(
      circle at top left,
      rgba(239, 68, 68, 0.12),
      transparent 34%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(59, 130, 246, 0.12),
      transparent 38%
    ),
    #081120;
}

.background-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}

.red-glow {
  top: -180px;
  left: -130px;
  width: 420px;
  height: 420px;
  background: rgba(239, 68, 68, 0.14);
}

.blue-glow {
  right: -160px;
  bottom: -180px;
  width: 480px;
  height: 480px;
  background: rgba(59, 130, 246, 0.14);
}

.landing-container {
  position: relative;
  z-index: 1;
  width: min(1120px, calc(100% - 32px));
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.landing-header {
  display: flex;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand > div {
  display: flex;
  flex-direction: column;
}

.brand strong {
  color: #f8fafc;
  font-size: 22px;
  letter-spacing: 0.04em;
}

.vue-edition {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
}

.vue-edition img,
.tech-line img {
  width: 12px;
  height: 12px;
}

.vue-edition small {
  color: #a7b4cc;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pokeball {
  position: relative;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    #ef4444 0%,
    #ef4444 45%,
    #1f2937 45%,
    #1f2937 55%,
    #f8fafc 55%,
    #f8fafc 100%
  );
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.45);
}

.pokeball::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border: 3px solid #1f2937;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
}

.project-badge {
  padding: 7px 11px;
  border: 1px solid rgba(250, 204, 21, 0.24);
  border-radius: 999px;
  background: rgba(250, 204, 21, 0.07);
  color: #fde047;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.78fr);
  align-items: center;
  gap: 64px;
  padding: 18px 0 34px;
}

.eyebrow {
  margin: 0 0 11px;
  color: #facc15;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  max-width: 650px;
  margin: 0;
  color: #f8fafc;
  font-size: clamp(58px, 7vw, 84px);
  line-height: 0.96;
  letter-spacing: -0.045em;
}

h1 span {
  display: block;
  margin-top: 7px;
  color: #ef4444;
  text-shadow: 0 0 26px rgba(239, 68, 68, 0.25);
}

.hero-description {
  max-width: 610px;
  margin: 21px 0 0;
  color: #a7b4cc;
  font-size: 16px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
  margin-top: 27px;
}

.primary-button {
  position: relative;
  display: inline-flex;
  min-height: 47px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border-radius: 999px;
  background: #ef4444;
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 0 12px 25px rgba(239, 68, 68, 0.28);
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
  animation: button-pulse 2.2s ease-in-out infinite;
}

.primary-button:hover {
  transform: translateY(-3px) scale(1.03);
  background: #dc2626;
  box-shadow:
    0 16px 29px rgba(239, 68, 68, 0.42),
    0 0 24px rgba(239, 68, 68, 0.2);
}

.primary-button span {
  display: inline-block;
  font-size: 20px;
  line-height: 1;
  animation: arrow-slide 1.5s ease-in-out infinite;
}

.tech-line {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 30px;
  color: #64748b;
  font-size: 12px;
}

.hero-visual {
  position: relative;
  display: grid;
  min-height: 470px;
  place-items: center;
}

.orbit {
  position: absolute;
  width: 390px;
  height: 390px;
  border: 1px solid rgba(96, 165, 250, 0.1);
  border-radius: 50%;
}

.pokemon-card {
  position: relative;
  z-index: 2;
  width: min(100%, 325px);
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 23px;
  background: linear-gradient(
    145deg,
    rgba(23, 38, 61, 0.98),
    rgba(13, 24, 43, 0.98)
  );
  box-shadow: 0 22px 44px rgba(2, 8, 23, 0.36);
}

.card-top,
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-top {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
}

.api-badge {
  padding: 4px 8px;
  border: 1px solid rgba(96, 165, 250, 0.42);
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.pokemon-stage {
  position: relative;
  display: grid;
  min-height: 282px;
  place-items: center;
}

.pokemon-glow {
  position: absolute;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.13);
  filter: blur(13px);
}

.featured-pokemon {
  position: relative;
  z-index: 1;
  width: 225px;
  height: 225px;
  object-fit: contain;
  filter: drop-shadow(0 18px 16px rgba(2, 8, 23, 0.42));
  animation: float 3.4s ease-in-out infinite;
}

.card-bottom small {
  display: block;
  color: #94a3b8;
  font-size: 11px;
}

.card-bottom strong {
  display: block;
  margin-top: 3px;
  color: #f8fafc;
  font-size: 22px;
}

.type-badge {
  padding: 6px 11px;
  border: 1px solid rgba(34, 197, 94, 0.42);
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.14);
  color: #86efac;
  font-size: 12px;
  font-weight: 900;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}

@keyframes button-pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 12px 25px rgba(239, 68, 68, 0.28),
      0 0 0 0 rgba(239, 68, 68, 0.16);
  }

  50% {
    transform: scale(1.035);
    box-shadow:
      0 15px 28px rgba(239, 68, 68, 0.4),
      0 0 0 8px rgba(239, 68, 68, 0);
  }
}

@keyframes arrow-slide {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 18px;
    padding-top: 30px;
  }

  .hero-visual {
    min-height: 390px;
  }
}

@media (max-width: 560px) {
  .landing-container {
    width: min(100% - 22px, 1120px);
  }

  .landing-header {
    min-height: 68px;
  }

  .project-badge {
    display: none;
  }

  h1 {
    font-size: clamp(50px, 15vw, 68px);
  }

  .hero-description {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-button {
    width: 100%;
  }

  .hero-visual {
    min-height: 340px;
  }

  .orbit {
    width: 305px;
    height: 305px;
  }

  .pokemon-card {
    width: min(100%, 290px);
  }

  .pokemon-stage {
    min-height: 235px;
  }

  .featured-pokemon {
    width: 185px;
    height: 185px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-button,
  .primary-button span,
  .featured-pokemon {
    animation: none;
  }
}
</style>
