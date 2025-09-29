export type StoreCategoryType = {
  category_name: string
  status: boolean | string | number
}

export type StoreType = {
  store_no: string
  store_name: string
  floor_location: string
  category_id: string | number
  status: boolean | string | number
}
