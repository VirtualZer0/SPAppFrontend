<template>
  <section
    id="our-services"
    class="our-services"
  >
    <h2 class="section-title">
      <span class="pi pi-th-large" />
      Наши сервисы
    </h2>
    <div class="service-table">
      <div class="service glowberries">
        <img
          class="service-logo"
          src="/img/market/logo-dark.svg"
          alt="Лого"
        />
        <div class="service-content">
          <h3>
            Glowberries
            <div class="serv-badges">
              <span class="spm">СПм</span>
            </div>
          </h3>
          <p>
            Маркетплейс товаров с доставкой в любую точку сервера. Заказывайте нужные товары с мгновенной оплатой или откройте свой магазин и продавайте по
            выгодным условиям
          </p>
          <button
            class="primary-button"
            severity="warning"
          >
            Открыть
          </button>
        </div>
      </div>
      <div class="service starter">
        <img
          class="service-logo"
          src="/img/starter/logo-dark.svg"
          alt="Лого"
        />
        <div class="service-content">
          <h3>
            Starter
            <div class="serv-badges">
              <span class="sp">СП</span>
              <span class="spm">СПм</span>
            </div>
          </h3>
          <p>
            Краундфандинговая платформа для сбора АРов на любые идеи. Если вы хотите создать что-то, но не имеете ресурсов, или же хотите профинансировать
            понравившиеся проекты - вам сюда
          </p>
          <NuxtLink to="/starter">
            <button
              class="primary-button"
              severity="warning"
            >
              Открыть
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="service company">
        <img
          class="service-logo"
          src="/img/company/logo-dark.svg"
          alt="Лого"
        />
        <div class="service-content">
          <h3>
            WorkAssist
            <div class="serv-badges">
              <span class="sp">СП</span>
              <span class="spm">СПм</span>
            </div>
          </h3>
          <p>
            Инструмент для предпринимателей и рабочих, позволяющий публиковать и отвечать на резюме и производить автоматические выплаты работникам по заданному
            расписанию
          </p>
          <NuxtLink to="/wa">
            <button
              class="primary-button"
              severity="warning"
            >
              Открыть
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="service unknown">
        <img
          class="service-logo"
          src="/img/unknown.svg"
          alt="Лого"
        />
        <div class="service-content">
          <h3>Новый сервис уже на подходе!</h3>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.our-services {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;

  .primary-button {
    width: 160px;
  }

  .service {
    display: flex;
    gap: 12px;
    transition: transform 0.3s ease;
    width: 43%;

    &-table {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5rem;
    }

    &-content {
      display: flex;
      flex-direction: column;
      padding-left: 32px;
    }

    &-logo {
      width: 10rem;
      filter: drop-shadow(0px 0px 30px transparent);
      transition: filter 0.3s ease;
    }

    h3 {
      font-size: 1.8rem;
      align-self: flex-start;
      margin: 0;
      position: relative;

      .serv-badges {
        display: flex;
        gap: 8px;
        position: absolute;
        font-size: 0.8rem;
        left: calc(100% + 18px);
        top: -4px;

        .spm,
        .sp {
          width: 2.85rem;
          text-align: center;
          background: var(--p2-color);
          color: var(--bg-color);
          padding: 2px 0;
          border-radius: 8px;
        }

        .sp {
          background: var(--p1-color);
        }
      }
    }

    .pi {
      font-size: 3rem;
      margin: 0 24px;
    }

    &:hover {
      transform: scale(1.02);
    }

    &.glowberries {
      //margin-left: -10vw;

      &:hover {
        .service-logo {
          filter: drop-shadow(0px 0px 40px var(--market-p1-color));
        }
      }

      .primary-button {
        background-image: linear-gradient(to left, var(--market-p1-color), var(--market-p2-color));
      }
    }

    &.starter {
      //margin-left: 10vw;

      &:hover {
        .service-logo {
          filter: drop-shadow(0px 0px 40px var(--starter-p1-color));
        }
      }

      .primary-button {
        background-image: linear-gradient(to left, var(--starter-p1-color), var(--starter-p2-color));
      }
    }

    &.company {
      //margin-left: -10vw;

      &:hover {
        .service-logo {
          filter: drop-shadow(0px 0px 40px var(--company-p1-color));
        }
      }

      .primary-button {
        background-image: linear-gradient(to left, var(--company-p1-color), var(--company-p2-color));
      }
    }

    &.unknown {
      //margin-left: 10vw;
      align-items: center;

      &:hover {
        .service-logo {
          filter: drop-shadow(0px 0px 40px #fff);
        }
      }
    }
  }
}
</style>
