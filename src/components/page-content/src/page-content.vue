<template>
  <div class="page-content">
    <my-table
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- #header -->
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>
      <!-- #enable 启用状态-->
      <template #status="{ row }">
        <el-button
          plain
          size="mini"
          :type="row.enable ? 'success' : 'danger'"
          >{{ row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <!-- 时间插槽处理格式 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- #handler 按钮操作 -->
      <template #handler>
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import MyTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    MyTable
  },
  setup(props) {
    const store = useStore()

    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageList())

    const getPageList = (params: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...params
        }
      })
    }

    getPageList()

    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const listCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    return { listData, listCount, getPageList, pageInfo }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
