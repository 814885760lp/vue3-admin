<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleReset="handleResetClick"
      @handleSearch="handleSearchClick"
    ></page-search>
    <page-content
      ref="searchContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @handleCreateClick="handleCreateClick"
      @handleEditClick="handleEditClick"
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
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useStore } from '@/store'
import { usePageSearch } from '@/hooks/usePageSearch'
import { useModalHook } from '@/hooks/useModal'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

export default defineComponent({
  name: 'user',
  emits: ['handleCreateClick', 'handleEditClick'],
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [searchContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const [pageModalRef, defaultInfo, handleCreateClick, handleEditClick] =
      useModalHook(newCallback, editCallback)

    // 2.动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      searchContentRef,
      handleResetClick,
      handleSearchClick,
      handleCreateClick,
      handleEditClick,
      defaultInfo,
      pageModalRef
    }
  }
})
</script>

<style scoped></style>
