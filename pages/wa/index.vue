<template>
  <section class="page company-page">
    <WAWelcome />
    <WAFeatures />
    <LastVacancies />
  </section>
</template>
<script lang="ts" setup>
import WAWelcome from '../../components/wa/blocks/other/WAWelcome.vue';
import WAFeatures from '../../components/wa/blocks/other/WAFeatures.vue';
import LastVacancies from '../../components/wa/blocks/vacancy/LastVacancies.vue';

definePageMeta({
  layout: 'company'
});
</script>
<style lang="scss" scoped>
.company-page {
  section {
    margin-bottom: 64px;
  }
}
</style>
