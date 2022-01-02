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
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
