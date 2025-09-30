import { getCommitteeSignatoryList } from '@actions/settings/committee-signatories-config'
import CommitteeSignatoriesPageUi from './ui'

type SearchParams = {
  page?: number
  per_page?: number
  search?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

const CommitteeSignatoriesPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const { per_page = 10, page = 1, search = '' } = params
  const res = await getCommitteeSignatoryList({ page, per_page, search })
  return <CommitteeSignatoriesPageUi data={res} />
}

export default CommitteeSignatoriesPage
