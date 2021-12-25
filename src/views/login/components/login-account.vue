<template>
  <div>
    <el-form :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: '',
      password: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否要记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 通过验证了
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return { account, rules, formRef, loginAction }
  }
})
</script>

<style scoped></style>
