<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleReset="handleResetClick"
      @handleSearch="handleSearchClick"
    ></page-search>
    <page-content
      ref="searchContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    >
      <!-- #enable 启用状态-->
      <template #status="{ row }">
        <el-button
          plain
          size="mini"
          :type="row.enable ? 'success' : 'danger'"
          >{{ row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent },
  setup() {
    const [searchContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      searchContentRef,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped></style>
