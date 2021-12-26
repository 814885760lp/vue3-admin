<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/imgs/logo.svg" />
      <span class="title" v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      router
      :default-active="$route.path"
      :collapse="collapse"
    >
      <template v-for="subMenu in userMenus" :key="subMenu.id">
        <template v-if="subMenu.type === 1">
          <el-submenu :index="subMenu.id + ''">
            <template #title>
              <i v-if="subMenu.icon" :class="subMenu.icon"></i>
              <span>{{ subMenu.name }}</span>
            </template>
            <template v-for="item in subMenu.children" :key="item.id">
              <el-menu-item :index="item.url">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="subMenu.type === 2">
          <el-menu-item :index="subMenu.url">
            <i v-if="subMenu.icon" :class="subMenu.icon"></i>
            <span>{{ subMenu.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      defaul: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => {
      return store.state.login.userMenus
    })
    return { userMenus }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
