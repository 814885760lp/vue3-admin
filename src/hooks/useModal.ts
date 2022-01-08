import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function useModalHook(newCb?: CallbackFn, editCb?: CallbackFn) {
  // 获取modal组件的ref
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  // 传递给modal组价的值
  const defaultInfo = ref<any>({})

  // 新建点击事件
  const handleCreateClick = () => {
    console.log(123)
    defaultInfo.value = {}
    pageModalRef.value!.dialogVisible = true
    newCb && newCb()
  }

  // 获取编辑回显数据
  const handleEditClick = (row: any) => {
    defaultInfo.value = { ...row }
    pageModalRef.value!.dialogVisible = true
    editCb && editCb(row)
  }

  return [pageModalRef, defaultInfo, handleCreateClick, handleEditClick]
}
