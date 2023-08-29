<template>
  <section class="wa-features">
    <h2 class="section-title"><span class="pi pi-star" />Преимущества WorkAssist</h2>
    <div class="features-container">
      <div class="feature">
        <img
          src="/img/company/feat-1.svg"
          alt="Брендинг компании"
        />
        <div class="text">
          <h3>Брендинг компании</h3>
          <p>Каждая компания получает свою настраиваемую страницу со всей информацией и списком услуг, а так же короткую ссылку для нее</p>
        </div>
      </div>
      <div class="feature">
        <img
          src="/img/company/feat-2.svg"
          alt="Размещение вакансий"
        />
        <div class="text">
          <h3>Размещение вакансий</h3>
          <p>Создание вакансии с удобным поиском и сортировкой для эффективного поиска сотрудников на любые виды работ</p>
        </div>
      </div>
      <div class="feature">
        <img
          src="/img/company/feat-3.svg"
          alt="Оплата по QR"
        />
        <div class="text">
          <h3>Оплата по QR</h3>
          <p>Создание QR-кодов для быстрой безналичной оплаты услуг с автоматической генерацией схематики</p>
        </div>
      </div>
      <div class="feature">
        <img
          src="/img/company/feat-4.svg"
          alt="Автоплатежи"
        />
        <div class="text">
          <h3>Автоплатежи</h3>
          <p>Автопереводы АРов по расписанию - для оплаты налогов и выдачи заработной платы без вашего участия</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.wa-features {
  h2 {
    margin-bottom: 48px;
  }
  .features-container {
    max-width: 1300px;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    gap: 64px;

    .feature {
      display: flex;
      gap: 32px;

      img {
        width: 20%;
      }

      h3 {
        color: var(--p1-color);
      }
    }
  }
}
</style>
