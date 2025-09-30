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

export type StoreOwnerType = {
  store_id: string | number
  owner_name: string
  owner_nid: string
  owner_contact: string
  owner_email: string | null
  sms_receiving_mobile: string
  email_receiving_address: string | null
  remarks: string | null
  status: boolean | string | number
}
