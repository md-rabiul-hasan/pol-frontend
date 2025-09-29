'use server'

import { StoreCategoryType } from '@types'
import api from '@utils/api'
import { revalidatePath } from 'next/cache'
import { StatusMsg } from '@config/constants'
import { AxiosError } from 'axios'

export const getStoreCategoryList = async (params?: { page?: number; per_page?: number; search?: string }) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get('/settings/store-categories', {
      params
    })

    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const createStoreCategory = async (formData: StoreCategoryType, path?: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/settings/store-categories', {
      ...formData
    })

    revalidatePath('/settings/store-categories')

    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const updateStoreCategory = async (id: number, formData: StoreCategoryType) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/settings/store-categories/${id}`, formData)
    revalidatePath('/settings/store-categories')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const deleteStoreCategory = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.delete(`/settings/store-categories/${id}`)
    revalidatePath('/settings/store-categories')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
