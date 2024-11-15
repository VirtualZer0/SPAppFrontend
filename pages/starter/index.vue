<template>
  <section class="page starter-page">
    <StarterWelcome />
    <Share />
    <LatestCrowdfunds />
  </section>
</template>
<script lang="ts" setup>
import StarterWelcome from '~/components/starter/blocks/other/StarterWelcome.vue';
import LatestCrowdfunds from '~/components/starter/blocks/crowdfund/LatestCrowdfunds.vue';
import Share from '~/components/blocks/modal/Share.vue';

definePageMeta({
  layout: 'starter'
});
</script>
<style lang="scss" scoped></style>
