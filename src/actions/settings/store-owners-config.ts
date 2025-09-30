'use server'

import { StatusMsg } from '@config/constants'
import { StoreCategoryType, StoreOwnerType } from '@types'
import api from '@utils/api'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const getStoreOwnerList = async (params?: { page?: number; per_page?: number; search?: string }) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get('/settings/store-owners', {
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

export const createStoreOwner = async (formData: StoreOwnerType, path?: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/settings/store-owners', {
      ...formData
    })

    revalidatePath('/settings/store-owners')

    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const getStoreOwnerDetails = async (id: number) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get(`/settings/store-owners/${id}`)

    return data
  } catch (error: any) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const updateStoreOwner = async (id: number, formData: StoreOwnerType) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/settings/store-owners/${id}`, formData)
    revalidatePath('/settings/stores')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const deleteStoreOwner = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.delete(`/settings/store-owners/${id}`)
    revalidatePath('/settings/store-owners')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
