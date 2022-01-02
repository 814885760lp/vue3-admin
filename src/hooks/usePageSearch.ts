import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const searchContentRef = ref<InstanceType<typeof PageContent>>()
  // 监听重置
  const handleResetClick = () => {
    searchContentRef.value?.getPageList({})
  }

  // 监听搜索
  const handleSearchClick = (searchParams: any) => {
    console.log(searchContentRef.value)
    searchContentRef.value?.getPageList(searchParams)
  }

  return [searchContentRef, handleResetClick, handleSearchClick]
}
