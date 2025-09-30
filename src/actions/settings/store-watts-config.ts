'use server'

import { StatusMsg } from '@config/constants'
import { StoreCategoryType, StoreOwnerType } from '@types'
import api from '@utils/api'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const getStoreWattList = async (params?: { page?: number; per_page?: number; search?: string }) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get('/settings/store-watts', {
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

export const createStoreWatt = async (formData: StoreOwnerType, path?: string) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/settings/store-watts', {
      ...formData
    })

    revalidatePath('/settings/store-watts')

    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const getStoreWattDetails = async (id: number) => {
  try {
    const apiObj = await api()

    const { data } = await apiObj.get(`/settings/store-watts/${id}`)

    return data
  } catch (error: any) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const updateStoreWatt = async (id: number, formData: StoreOwnerType) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.put(`/settings/store-watts/${id}`, formData)
    revalidatePath('/settings/store-watts')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const deleteStoreWatt = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.delete(`/settings/store-watts/${id}`)
    revalidatePath('/settings/store-watts')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
