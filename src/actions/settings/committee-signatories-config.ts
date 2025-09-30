'use server'

import { StatusMsg } from '@config/constants'
import api from '@utils/api'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const getCommitteeSignatoryList = async (params?: { page?: number; per_page?: number; search?: string }) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get('/settings/committee-signatories', { params })
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const createCommitteeSignatory = async (formData: FormData) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post('/settings/committee-signatories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    revalidatePath('/settings/committee-signatories')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const getCommitteeSignatoryDetails = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.get(`/settings/committee-signatories/${id}`)
    return data
  } catch (error: any) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const updateCommitteeSignatory = async (id: number, formData: FormData) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.post(`/settings/committee-signatories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    revalidatePath('/settings/committee-signatories')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}

export const deleteCommitteeSignatory = async (id: number) => {
  try {
    const apiObj = await api()
    const { data } = await apiObj.delete(`/settings/committee-signatories/${id}`)
    revalidatePath('/settings/committee-signatories')
    return data
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An unknown error occurred'
    }
  }
}
