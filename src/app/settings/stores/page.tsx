import { getStoreCategories } from '@actions/common-config'
import { getStoreList } from '@actions/settings/stores-config'
import StoreCategoriesPageUi from './ui'

type SearchParams = {
  page?: number
  per_page?: number
  search?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

const StorePage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const { per_page = 10, page = 1, search = '' } = params
  const res = await getStoreList({ page, per_page, search })
  const categories = await getStoreCategories();
  return <StoreCategoriesPageUi data={res} categories={categories} />
}

export default StorePage
