import { getStoreList } from '@actions/settings/stores-config'
import StoreOwnersPageUi from './ui'
import { getStoreOwnerList } from '@actions/settings/store-owners-config'
import { getCommonStores } from '@actions/common-config'

type SearchParams = {
  page?: number
  per_page?: number
  search?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

const StoreOwnersPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const { per_page = 10, page = 1, search = '' } = params
  const res = await getStoreOwnerList({ page, per_page, search })
  const stores = await getCommonStores() // Get all stores for dropdown
  return <StoreOwnersPageUi data={res} stores={stores} />
}

export default StoreOwnersPage
