<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleReset="handleResetClick"
      @handleSearch="handleSearchClick"
    ></page-search>
    <page-content
      ref="searchContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @handleCreateClick="handleNewData"
      @handleEditClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { useModalHook } from '@/hooks/useModal'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

export default defineComponent({
  name: 'role',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      useModalHook(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const [searchContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    const otherInfo = ref<any>({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      searchContentRef,
      handleResetClick,
      handleSearchClick,
      defaultInfo,
      pageModalRef,
      otherInfo,
      menus,
      handleNewData,
      handleEditData,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
