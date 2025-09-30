'use server'

import api from '@utils/api'

export const getCommonStoreCategories = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/common/store-categories')
    return data.data
  } catch (error) {
    return []
  }
}

export const getCommonStores = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/common/stores')
    return data.data
  } catch (error) {
    return []
  }
}
