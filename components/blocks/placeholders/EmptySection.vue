<template>
  <div class="empty-section">
    <img
      v-if="img"
      :src="img"
      alt="Пусто"
      height="256"
    />
    <div class="content">
      <div
        v-if="text"
        class="text text-xl"
      >
        {{ text }}
      </div>
      <Button
        v-if="showAction"
        :label="actionText"
        :icon="actionIcon"
        outlined
        @click="emits('action')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button';

const props = defineProps({
  img: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: 'Здесь ничего нет'
  },
  showAction: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: ''
  },
  actionIcon: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['action']);
</script>
<style lang="scss" scoped>
.empty-section {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 5%;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    margin-top: 24px;
  }

  @media (max-width: 640px) {
    img {
      height: 184px;
    }
  }
}
</style>
