<template>
  <section class="page my-shop-page">
    <TabMenu
      :model="tabMenu"
      class="my-shop-menu"
    />
    <NuxtPage />
  </section>
</template>
<script lang="ts" setup>
import TabMenu from 'primevue/tabmenu';

const tabMenu = [
  {
    icon: 'pi pi-sliders-h',
    label: 'Общее'
  },
  {
    icon: 'pi pi-shopping-bag',
    label: 'Товары'
  },
  {
    icon: 'pi pi-truck',
    label: 'Заказы'
  }
];

if (useRoute().fullPath === '/profile/shop') {
  useRouter().push('/profile/shop/main');
}
</script>
<style lang="scss" scoped>
.my-shop-menu {
  margin-bottom: 32px;
}
</style>
