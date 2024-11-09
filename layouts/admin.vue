<script setup lang="ts">
import { AdminRoutes } from "~/data";
import Link from "~/components/ui/Link.vue";
</script>

<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <div
        class="navbar__item"
        v-for="(route, index) in AdminRoutes"
        :key="index"
      >
        <Link size="xl" :to="route.url">
          <span class="navbar__link">
            <span>{{ route.name }}</span>
            <Icon size="22" :name="route.icon" />
          </span>
        </Link>
      </div>
    </div>
  </nav>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  width: 250px;
  height: 100%;
  background: $slate-900;
  border-right: 2px solid $slate-800;
  top: 0;
  left: 0;
  transform: translateX(-75%);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px $slate-800;

  &:hover {
    transform: translateX(0);
  }

  &__inner {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $slate-500;
    padding: 20px;

    &:hover {
      background: $slate-800;
    }

    span {
      color: $slate-500;
    }
  }
}

.container {
  padding: 0 40px 0 250px;
}
</style>
