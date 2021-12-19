import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
} from 'element-plus'
import 'element-plus/lib/theme-chalk/base.css'
import type { App } from 'vue'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
]
export default function registerElement(app: App): void {
  for (const comp of components) {
    app.component(comp.name, comp)
  }
}
