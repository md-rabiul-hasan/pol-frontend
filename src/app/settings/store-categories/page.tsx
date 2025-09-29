import { getStoreCategoryList } from '@actions/settings/store-categories-config'
import StoreCategoriesPageUi from './ui'

type SearchParams = {
  page?: number
  per_page?: number
  search?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

const StoreCategoriesPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const { per_page = 10, page = 1, search = '' } = params
  const res = await getStoreCategoryList({ page, per_page, search })
  return <StoreCategoriesPageUi data={res} />
}

export default StoreCategoriesPage
