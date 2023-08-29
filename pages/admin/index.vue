<template>
  <section class="page admin-index-page">
    <h2>Общая информация</h2>
    <div
      v-if="stat"
      class="cards"
    >
      <div class="item card">
        <h3>Пользователи</h3>
        <div class="item-content">
          <div>
            <span class="big">{{ stat.allUserCount }}</span> всего
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat.newUserTodayCount }}</span> сегодня
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat.newUserLastWeekCount }}</span> за неделю
          </div>
        </div>
      </div>

      <div class="item card">
        <h3>Активные пользователи</h3>
        <div class="item-content">
          <div>
            <span class="big">{{ stat.allUserCount }}</span> сегодня
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat.newUserTodayCount }}</span> за неделю
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat.newUserLastWeekCount }}</span> за месяц
          </div>
        </div>
      </div>

      <div class="item card">
        <h3>Пополнения счета</h3>
        <div class="item-content">
          <div>
            <span class="big">{{ stat.paymentCount }}</span> всего
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat?.paymentTodayCount }}</span> сегодня
          </div>
          <span class="delimiter">/</span>
          <div>
            <span class="big">{{ stat.paymentLastWeekCount }}</span> за неделю
          </div>
        </div>

        <div class="item-content">
          <div>
            <span class="big error">{{ stat.paymentTodayFailedCount }}</span> отмененных сегодня
          </div>
        </div>
      </div>

      <div class="item card">
        <h3>Системный баланс</h3>
        <div class="item-content">
          <div>
            <span class="big">{{ stat.spCardBalance ?? '--' }} АР</span> на СП
          </div>
        </div>

        <div class="item-content">
          <div>
            <span class="big blue">{{ stat.spmCardBalance ?? '--' }} АР</span> на СПм
          </div>
        </div>

        <div
          v-if="stat.spCardBalance == null || !stat.spmCardBalance == null"
          class="item-content"
        >
          <span class="error pi pi-exclamation-triangle" />
          <span class="error"> Ошибка SPWorlds API </span>
        </div>
      </div>
    </div>
    <div
      v-else
      class="loading"
    >
      <div class="pi pi-spinner" />
      <h3>Запрос системного баланса...</h3>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Panel from 'primevue/panel';
import { useMainStore } from '~/store/main';
import { useApi } from '~/api/useApi';

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const stat = ref<null | AdminDto.MainStatDto>(null);

const loadStats = async () => {
  stat.value = null;
  const statRes = await useApi().admin.getMainStat();

  if (statRes.data) {
    stat.value = statRes.data;
  }
};

watch(
  () => useMainStore().server.selectedMCServer,
  async () => {
    await loadStats();
  }
);

onMounted(async () => {
  await loadStats();
});
</script>
<style lang="scss" scoped>
.admin-index-page {
  flex-grow: 1;

  .loading {
    margin-top: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    .pi {
      animation: rotation 1s linear infinite;
    }
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;

  .item {
    min-width: 240px;
    h3 {
      margin-top: 0;
    }

    &-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
    }

    .error {
      color: var(--danger-color);
    }

    .big {
      font-size: 3rem;
      font-weight: lighter;
      margin-right: 8px;
      color: var(--p1-color);

      &.error {
        color: var(--danger-color);
      }

      &.blue {
        color: var(--p2-color);
      }
    }

    .delimiter {
      font-weight: lighter;
      font-size: 2.5rem;
      opacity: 0.5;
    }
  }
}
</style>
