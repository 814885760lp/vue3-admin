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
        <el-button type="primary" size="medium" v-if="hasCreate"
          >新建用户</el-button
        >
      </template>
      <!-- 时间插槽处理格式 -->
      <template #createAt="{ row }">
        <span>{{ $filters.formatTime(row.createAt) }}</span>
      </template>
      <template #updateAt="{ row }">
        <span>{{ $filters.formatTime(row.updateAt) }}</span>
      </template>
      <!-- #handler 按钮操作 -->
      <template #handler>
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="hasUpdate"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="hasDelete"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 其他动态插槽 -->
      <template
        v-for="item in slotList"
        :key="item.prop"
        #[item.slotName!]="{ row }"
      >
        <slot :name="item.slotName" :row="row"></slot>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import MyTable from '@/base-ui/table'
import { contentTableConfig } from '@/views/main/product/goods/config/content.config'
import { usePermission } from '@/hooks/userPerssion'

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

    // 获取按钮权限
    const hasCreate = usePermission(props.pageName!, ' create')
    const hasUpdate = usePermission(props.pageName!, ' update')
    const hasDelete = usePermission(props.pageName!, ' delete')
    const hasQuery = usePermission(props.pageName!, ' query')

    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageList())

    const getPageList = (params: any = {}) => {
      if (hasQuery) {
        return
      }
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

    const slotList = computed(() => {
      const baseSlotList = ['status', 'image']
      const list = contentTableConfig.propList.filter(
        (item) => item.slotName && baseSlotList.includes(item.slotName)
      )

      return list
    })

    return {
      listData,
      listCount,
      getPageList,
      pageInfo,
      slotList,
      hasCreate,
      hasUpdate,
      hasDelete
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
