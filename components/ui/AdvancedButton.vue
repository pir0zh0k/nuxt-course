<script lang="ts" setup>
interface Props {
  variant?: "primary" | "outlined";
  fullWidth?: boolean;
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
});
</script>

<template>
  <button
    class="btn"
    :class="{
      [`btn__${variant}`]: variant,
      '_full-width': fullWidth,
    }"
  >
    <slot></slot>
    <Icon v-if="icon" :name="icon" />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  @include Text-base;
  cursor: pointer;
  display: inline-block;
  padding: 8px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &__primary {
    transition: background 0.2s ease;
    background: $slate-800;

    &:hover {
      background: $slate-900;
    }
  }

  &__outlined {
    border: 1px solid $slate-800;
    transition: border 0.2s ease;

    &:hover {
      border: 1px solid $slate-900;
    }
  }

  &._full-width {
    width: 100%;
  }
}
</style>
