export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useUserSession();

  if (!user.value) {
    return navigateTo("/admin");
  }

  if (!user.value.isAdmin) {
    return navigateTo("/admin");
  }
});
