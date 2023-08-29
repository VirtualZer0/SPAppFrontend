<template>
  <section class="welcome">
    <div class="top">
      <div class="anim-logo">
        <div class="layer-1" />
        <div class="layer-2" />
      </div>
      <h2>
        <div class="line-1">Единая экосистема</div>
        <div class="line-2">сервисов для <span class="highlight-1">СП</span> и <span class="highlight-2">СПм</span></div>
      </h2>
    </div>
    <div class="bottom">
      <div class="pi pi-angle-down one" />
      <div class="pi pi-angle-down two" />
      <div class="pi pi-angle-down three" />
    </div>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.welcome {
  margin: 0 auto;
  margin-top: 5vh;
  padding-bottom: 80px;

  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .anim-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 48vmin;
    height: 48vmin;

    .layer-1 {
      position: absolute;
      width: inherit;
      height: inherit;
      background: url('/img/logo/logo-layer-1.svg') no-repeat;
      background-position: center;
      background-size: contain;
      animation: rotation 15s linear infinite;
      opacity: 0.5;
    }

    .layer-2 {
      position: absolute;
      width: 37vmin;
      height: 37vmin;
      background: url('/img/logo/logo-layer-2.svg') no-repeat;
      background-size: contain;
      background-position: center;
      animation: rotation 21s linear infinite reverse;
    }
  }

  h2 {
    font-size: 3.5vw;
    z-index: 0;

    .line-1 {
      margin-left: -5vw;
    }

    .line-2 {
      margin-left: 2vw;
    }

    .highlight-1 {
      color: var(--p1-color);
    }

    .highlight-2 {
      color: var(--p2-color);
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;
    gap: 5vh;
    color: var(--p1-color);

    .pi {
      font-size: 64px;
    }

    .one,
    .two,
    .three {
      opacity: 0;
      animation: blink 2s linear infinite;
    }

    .two {
      animation-delay: 0.66s;
    }

    .three {
      animation-delay: 1.33s;
    }
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
</style>
