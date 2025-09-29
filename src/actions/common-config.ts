'use server'

import api from '@utils/api'

export const getStoreCategories = async () => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/common/store-categories')
    return data.data
  } catch (error) {
    return []
  }
}