<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-control">
      <el-checkbox v-model="isKeepPassword" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-button" type="primary" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: { LoginPhone, LoginAccount },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLoginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    return { isKeepPassword, accountRef, handleLoginClick }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .login-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
