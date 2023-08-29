<template>
  <Card class="vacancy-small-card">
    <template #title>
      <div class="title">
        {{ name }}
        <span class="pi pi-wrench" />
      </div>
    </template>

    <template #subtitle>
      <div class="company-name">
        <span class="pi pi-building" />
        {{ company }}
      </div>
    </template>

    <template #content>
      <span class="description"> Тестовая вакансия от тестовой компании которая ищет тестового рабочего на тестовую работу </span>
    </template>

    <template #footer>
      <div class="bottom">
        <div class="salary">
          <img
            src="/img/icons/diamond.svg"
            alt="АРы"
            height="32"
          />
          Не указана
        </div>
        <Button
          outlined
          label="Смотреть"
        />
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  salary: {
    type: String,
    default: 'Не указано'
  }
});
</script>
<style lang="scss" scoped>
.vacancy-small-card {
  width: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;

    .pi {
      font-size: 1.5rem;
      color: var(--p2-color);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .company-name,
  .salary {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 12px;

    .pi {
      font-size: 1.2rem;
    }
  }

  .salary {
    color: var(--p1-color);
    font-weight: bold;
    font-size: 1.4rem;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
