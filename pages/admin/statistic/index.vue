<script lang="ts" setup>
import AdvancedButton from "~/components/ui/AdvancedButton.vue";

definePageMeta({
  layout: "",
  middleware: ["admin"],
});

const { clear } = useUserSession();

const logout = async () => {
  await clear();
  await location.reload();
};
</script>

<template>
  <h2>Statistic</h2>
  <AdvancedButton variant="outlined" @click="logout">Выйти</AdvancedButton>
</template>
