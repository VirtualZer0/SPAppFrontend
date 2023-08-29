<template>
  <section class="last-vacancies">
    <h2 class="section-title"><span class="pi pi-bolt" />Новые вакансии</h2>
    <div class="vacancy-container">
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
      <VacancySmallCard
        name="Тестовая вакансия"
        company="Тестовая компания"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import VacancySmallCard from '~/components/wa/items/VacancySmallCard.vue';
</script>
<style lang="scss" scoped>
.last-vacancies {
  .vacancy-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    gap: 32px;
  }
}
</style>
