<template>
  <section
    ref="title"
    class="starter-welcome"
  >
    <h2>
      <span class="line-1">Сервис краундфандинга для </span>
      <span class="line-2">сбора АРов на ваши проекты</span>
    </h2>
    <div class="actions">
      <NuxtLink to="/starter/all">
        <button class="primary-button">
          <span class="pi pi-palette" />
          Смотреть проекты
        </button>
      </NuxtLink>
      <NuxtLink to="/starter/create">
        <button class="primary-button">
          <span class="pi pi-megaphone" />
          Начать сбор
        </button>
      </NuxtLink>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useAuthorization } from '~/composables/useAuthorization';
import { spawnRandomParticle } from '~/utils/spawnParticle';

const title = ref<HTMLElement>();
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    if (!title.value) {
      return;
    }

    const classes = ['pi', `pi-thumbs-up${Math.random() > 0.5 ? '-fill' : ''}`, 'fadeup'];
    if (Math.random() > 0.5) {
      classes.push('alt');
    }
    spawnRandomParticle(classes, title.value, 4);
  }, 200);
});

onBeforeUnmount(() => clearInterval(timer as number));

const auth = useAuthorization();
</script>
<style lang="scss" scoped>
.starter-welcome {
  margin: 0 auto;
  margin-top: 72px;
  padding-bottom: 80px;
  max-width: 1920px;
  position: relative;

  &:deep(.particle) {
    font-size: 2rem;
    color: var(--p1-color);
    &.alt {
      color: var(--p2-color);
    }
  }

  h2 {
    z-index: 0;
    margin: 0 auto;
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

    .line-1 {
      margin-left: -10%;
      z-index: 1;
    }

    .line-2 {
      margin-left: 10%;
      z-index: 1;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    gap: 32px;
    margin-top: 10vh;
    position: relative;
    z-index: 1;

    .primary-button {
      height: 60px;
      padding: 0 32px;

      .pi {
        font-size: 1.4rem;
      }
    }
  }

  @media (max-width: 640px) {
    margin-top: 36px;

    h2 {
      font-size: 1.8rem;
      display: inline-block;
      text-align: center;
      position: relative;
      z-index: 1;
      .line-1,
      .line-2 {
        margin-left: 0;
      }
    }

    .actions {
      margin-top: 42px;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .primary-button {
        width: 320px;
        justify-content: flex-start;
      }
    }
  }
}
</style>
