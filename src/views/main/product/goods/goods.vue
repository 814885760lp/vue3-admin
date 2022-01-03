<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <!-- 图片插槽 -->
      <template #image="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
          :initial-index="1"
        >
        </el-image>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'

export default defineComponent({
  name: 'goods',
  components: { PageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
