'use server'

import { StatusMsg } from '@config/constants'
import { StoreCategoryType } from '@types'
import api from '@utils/api'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const getStoreList = async (params?: { page?: number; per_page?: number; search?: string }) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get('/settings/stores', {
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

export const createStore = async (formData: StoreCategoryType, path?: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/settings/stores', {
      ...formData
    })

    revalidatePath('/settings/stores')

    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const getStoreDetails = async (id: number) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get(`/settings/stores/${id}`)

    return data
  } catch (error: any) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const updateStore = async (id: number, formData: StoreCategoryType) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/settings/stores/${id}`, formData)
    revalidatePath('/settings/stores')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const deleteStore = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.delete(`/settings/stores/${id}`)
    revalidatePath('/settings/stores')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
