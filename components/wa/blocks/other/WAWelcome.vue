<template>
  <section class="wa-welcome">
    <h2>
      <img
        class="hex"
        src="/img/company/border.svg"
        alt="Декорация"
      />

      <span class="line-1">Удобный инструментарий для управления</span>
      <span class="line-2">вашей компанией и размещения вакансий</span>
    </h2>
    <div class="actions">
      <button
        class="primary-button"
        @click="createCompany"
      >
        <span class="pi pi-building" />
        Создать компанию
      </button>
      <button class="primary-button">
        <span class="pi pi-briefcase" />
        Смотреть вакансии
      </button>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useAuthorization } from '~/composables/useAuthorization';
const auth = useAuthorization();

const createCompany = async () => {
  console.log(await auth?.tryRequestAuth());
};
</script>
<style lang="scss" scoped>
.wa-welcome {
  margin: 0 auto;
  margin-top: 150px;
  padding-bottom: 80px;
  max-width: 1920px;

  h2 {
    z-index: 0;
    margin: 0 auto;
    font-size: 220%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

    .line-1 {
      margin-left: -10%;
      z-index: 1;
    }

    .line-2 {
      margin-left: 10%;
      z-index: 1;
    }

    .hex {
      left: 10%;
      top: -100%;
      z-index: 0;
      position: absolute;
      height: 300%;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    gap: 32px;
    margin-top: 10vh;
    position: relative;

    .primary-button {
      height: 60px;
      padding: 0 32px;

      .pi {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
