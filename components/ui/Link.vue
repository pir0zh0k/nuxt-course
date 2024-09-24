<script lang="ts" setup>
interface Props {
  variant?: "base" | "primary" | "outlined";
  to?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "base",
});
</script>

<template>
  <NuxtLink
    class="link"
    :class="{
      [`link__${variant}`]: variant,
    }"
    to=""
  >
    <slot></slot>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.link {
  @include Text-base;
  cursor: pointer;

  &__primary {
    transition: background 0.2s ease;
    background: $slate-800;
    display: inline-block;
    padding: 8px 20px;
    border-radius: 5px;

    &:hover {
      background: $slate-900;
    }
  }

  &__outlined {
    border: 1px solid $slate-800;
    transition: border 0.2s ease;
    display: inline-block;
    padding: 8px 20px;
    border-radius: 5px;

    &:hover {
      border: 1px solid $slate-900;
    }
  }

  &__base {
    transition: all 0.2s ease;
    text-decoration: underline;
    text-decoration-color: rgba(248, 250, 252, 0);

    &:hover {
      text-decoration-color: $slate-50;
    }
  }
}
</style>
