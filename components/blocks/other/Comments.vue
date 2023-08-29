<template>
  <section
    id="comments"
    class="comments"
  >
    <h3 class="flex-line-l">
      <span class="title">
        {{ comments.count }}
        {{ getNoun(comments.count, 'комментарий', 'комментария', 'комментариев') }}
      </span>
      <Dropdown
        v-model="sort"
        :options="sortVariants"
        option-label="name"
        option-value="value"
        class="comment-sort"
        @change="loadComments(true)"
      />
    </h3>
    <div
      v-if="mainStore.user.isAuthorized"
      class="write-comment"
    >
      <div class="form-item">
        <label for="comment">Оставить комментарий</label>
        <Textarea
          id="comment"
          v-model="comment"
          class="comment-input"
          rows="3"
          maxlength="512"
        />
      </div>
      <div class="actions">
        <Button
          label="Отправить"
          @click="sendComment"
        />
      </div>
    </div>
    <div
      v-else
      class="auth-for-comment"
    >
      <a @click="auth?.openAuth()">Войдите</a>, чтобы оставить комментарий
    </div>
    <div
      v-if="comments.items.length > 0"
      class="list"
    >
      <div
        v-for="comm in comments.items"
        :key="comm.id"
        class="comment"
      >
        <div class="top">
          <UserTag
            :user="comm.user"
            class="user"
          />
          <div class="date">
            {{ $dayjs(comm.createdAt + 'Z').format('DD.MM.YY HH:mm') }}
          </div>
        </div>
        <div class="text">{{ comm.text }}</div>
      </div>
      <Button
        v-if="comments.count > comments.items.length"
        ref="loadMoreButton"
        v-element-visibility="onLoadButtonVisibility"
        outlined
        label="Загрузить еще"
        :disabled="isLoading"
        icon="pi pi-ellipsis-h"
      />
    </div>
    <EmptySection
      v-else
      class="empty"
      img="/img/starter/comments.svg"
      text="Комментариев пока нет"
    />
  </section>
</template>
<script lang="ts" setup>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { PropType } from 'nuxt/dist/app/compat/capi';
import Dropdown from 'primevue/dropdown';
import { vElementVisibility } from '@vueuse/components';
import EmptySection from '../placeholders/EmptySection.vue';
import { useAuthorization } from '~/composables/useAuthorization';
import { useMainStore } from '~/store/main';
import { useApi } from '~/api/useApi';
import { getNoun } from '~/utils/getNoun';
import UserTag from '~/components/special/UserTag.vue';

const props = defineProps({
  apiPart: {
    type: String as PropType<'crowd'>,
    default: ''
  },
  id: {
    type: Number,
    required: true
  }
});

const api = useApi();

const auth = useAuthorization();
const mainStore = useMainStore();
const comment = ref('');
const comments = ref<MainDto.ItemList<MainDto.CommentDto>>({ count: 0, items: [] });
const isLoading = ref(false);

const sortVariants = [
  { name: 'Сначала старые', value: 'dateAsc' },
  { name: 'Сначала новые', value: 'dateDesc' }
];

const sort = ref<'dateAsc' | 'dateDesc'>('dateDesc');

const sendComment = async () => {
  if (comment.value === '') {
    return;
  }

  await api[props.apiPart].createComment(props.id, { text: comment.value });
  comment.value = '';

  await loadComments(true);
};

const onLoadButtonVisibility = async (value: Boolean) => {
  if (value && !isLoading.value && comments.value.items.length < comments.value.count) {
    await loadComments();
  }
};

const loadComments = async (replace = false) => {
  isLoading.value = true;
  const res = await api[props.apiPart].getComments?.(props.id, replace ? 0 : comments.value.items.length, 50, sort.value);
  if (!res.error && res.data) {
    if (comments.value.items.length === 0 || replace) {
      comments.value = res.data;
    } else {
      comments.value.items.push(...res.data.items);
      comments.value.count = res.data.count;
    }
  }
  isLoading.value = false;
};

onMounted(async () => await loadComments());
</script>
<style lang="scss" scoped>
.comments {
  .write-comment {
    .actions {
      text-align: right;
      margin-top: 18px;
    }

    margin-bottom: 24px;
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    .comment {
      .top {
        display: flex;
        gap: 32px;
        align-items: center;
        margin-bottom: 8px;

        .date {
          opacity: 0.6;
        }
      }
    }
  }

  .empty {
    margin-top: 48px;
  }

  .auth-for-comment {
    margin: 32px 0;
  }

  .comment-sort {
    height: 36px;
    align-items: center;
  }

  @media (max-width: 420px) {
    h3 {
      flex-wrap: nowrap;
      gap: 12px;
      justify-content: space-between;

      .title {
        min-width: 170px;
      }

      .comment-sort {
        max-width: 50%;
      }
    }
  }
}
</style>
