import { getStoreWattList } from '@actions/settings/store-watts-config'
import StoreWattsPageUi from './ui'
import { getCommonStores } from '@actions/common-config'

type SearchParams = {
  page?: number
  per_page?: number
  search?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

const StoreWattsPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const { per_page = 10, page = 1, search = '' } = params
  const res = await getStoreWattList({ page, per_page, search })
  const stores = await getCommonStores() // Get all stores for dropdown
  return <StoreWattsPageUi data={res} stores={stores} />
}

export default StoreWattsPage
