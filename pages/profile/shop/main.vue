<template>
  <section class="page my-shop-main-page">
    <Card class="shop-status">
      <template #title>Статус магазина</template>
      <template #content>
        <SelectButton
          option-label="name"
          style="display: flex"
          :options="shopStatusOptions"
      /></template>
    </Card>
    <Card class="shop-design">
      <template #title>Название и лого</template>
      <template #content> </template>
    </Card>
  </section>
</template>
<script lang="ts" setup>
import Card from 'primevue/card';
import SelectButton from 'primevue/selectbutton';

const a = ref(false);

const shopStatusOptions = [
  {
    name: 'Активен',
    value: true
  },
  {
    name: 'Отключен',
    value: false
  }
];
</script>
<style lang="scss" scoped>
.my-shop-main-page {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
  grid-template-areas:
    'shop-status shop-design shop-design shop-design shop-design'
    '. . . . .'
    '. . . . .'
    '. . . . .'
    '. . . . .';
}
.shop-status {
  grid-area: shop-status;
}
.shop-design {
  grid-area: shop-design;
}
</style>
