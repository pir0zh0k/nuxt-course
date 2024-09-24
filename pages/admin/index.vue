<script lang="ts" setup>
import Card from "~/components/ui/Card.vue";
import TextField from "~/components/ui/TextField.vue";
import AdvancedButton from "~/components/ui/AdvancedButton.vue";

definePageMeta({
  layout: "",
  middleware: [
    async (to, from) => {
      const { loggedIn, user } = useUserSession();

      if (loggedIn.value) {
        if (user.value.isAdmin) {
          return navigateTo("/admin/statistic");
        }
      }
    },
  ],
});

const { clear, user, session, loggedIn } = useUserSession();

const formError = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const login = async () => {
  const { data, status } = await useFetch("/api/auth", {
    method: "POST",
    body: { ...form },
  });

  if (status.value == "success") {
    await location.reload();
  }
};
</script>

<template>
  <div class="wrapper">
    <Card title="Вход">
      <form class="form" @submit.prevent="login">
        <TextField v-model="form.username" placeholder="Username" type="text" />
        <TextField
          v-model="form.password"
          placeholder="Password"
          type="password"
        />
        <AdvancedButton variant="outlined">Войти</AdvancedButton>
        <span v-if="formError"> Пользователь существует </span>
      </form>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: center;
  }
}
</style>
