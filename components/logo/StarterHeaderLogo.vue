<template>
  <div
    class="header-logo"
    @click="$router.push('/wa')"
  >
    <img
      src="/img/starter/logo-dark.svg"
      width="44"
      height="44"
      alt="Лого"
    />
    <h1>Starter</h1>
  </div>
</template>
<style lang="scss" scoped>
.header-logo {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 12px;
    transition: transform 0.3s ease;
  }

  h1 {
    margin: 0;
    font-size: 1.6rem;
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }
}
</style>
