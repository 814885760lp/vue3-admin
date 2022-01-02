<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="hanleReset">重置</el-button>
          <el-button icon="el-icon-search" type="primary" @click="hanleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form/index'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { MyForm },
  emits: ['handleReset', 'handleSearch'],
  setup(props, { emit }) {
    // 动态读取配置文件中的field字段，生成form表单绑定对象
    const formItems = props.searchFormConfig.formItems ?? []
    let formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 重置搜索
    const hanleReset = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('handleReset')
    }

    // 点击搜索
    const hanleSearch = () => {
      emit('handleSearch', formData.value)
    }

    return { formData, hanleReset, hanleSearch }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
