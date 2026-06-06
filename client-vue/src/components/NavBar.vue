<script setup>
import vueLogo from "@/assets/vue-logo.png";
</script>

<template>
  <header class="navbar">
    <div class="navbar-content">
      <RouterLink class="brand" to="/home">
        <span class="pokeball" aria-hidden="true"></span>

        <div>
          <strong>Pokémon</strong>

          <div class="vue-edition">
            <img :src="vueLogo" alt="Vue" />

            <small>Vue Edition</small>
          </div>
        </div>
      </RouterLink>

      <nav class="navbar-links" aria-label="Navegación principal">
        <RouterLink class="nav-link" to="/home"> Inicio </RouterLink>

        <RouterLink class="create-link" to="/create">
          <span>+</span>
          Crear Pokémon
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 18, 35, 0.9);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(3, 8, 20, 0.25);
}

.navbar-content {
  width: min(1180px, calc(100% - 32px));
  min-height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  text-decoration: none;
}

.brand > div {
  display: flex;
  flex-direction: column;
}

.brand strong {
  font-size: 20px;
  letter-spacing: 0.04em;
}

.brand small {
  color: #a7b4cc;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pokeball {
  position: relative;
  width: 38px;
  height: 38px;
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
  box-shadow: 0 0 18px rgba(239, 68, 68, 0.45);
}

.pokeball::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  border: 3px solid #1f2937;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-link,
.create-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 42px;
  padding: 0 15px;
  border-radius: 999px;
  color: #dce5f5;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;
}

.create-link {
  background: #ef4444;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(239, 68, 68, 0.28);
}

.create-link:hover {
  transform: translateY(-2px);
  background: #dc2626;
  box-shadow: 0 12px 22px rgba(239, 68, 68, 0.38);
}

.create-link span {
  font-size: 20px;
  line-height: 1;
}

.router-link-active.nav-link {
  background: rgba(250, 204, 21, 0.14);
  color: #facc15;
}

@media (max-width: 520px) {
  .navbar-content {
    width: min(100% - 20px, 1180px);
    min-height: 64px;
    gap: 10px;
  }

  .pokeball {
    width: 32px;
    height: 32px;
  }

  .brand strong {
    font-size: 17px;
  }

  .vue-edition {
    display: none;
  }

  .navbar-links {
    gap: 5px;
  }

  .nav-link,
  .create-link {
    min-height: 38px;
    padding: 0 10px;
    font-size: 12px;
  }

  .create-link span {
    display: none;
  }
}

.vue-edition {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
}

.vue-edition img {
  width: 12px;
  height: 12px;
  display: block;
}

.vue-edition small {
  color: #a7b4cc;
  font-size: 10px;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}
</style>
