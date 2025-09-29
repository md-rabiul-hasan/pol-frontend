import * as yup from 'yup'

export const storeCategoriesValidationSchema = yup.object().shape({
  category_name: yup.string().trim().required('Category name is required'),
  status: yup.string().required('Status is required')
})

export const storeValidationSchema = yup.object().shape({
  store_no: yup.string().trim().required('Store number is required'),
  store_name: yup.string().trim().required('Store name is required'),
  floor_location: yup.string().trim().required('Floor location is required'),
  category_id: yup.string().trim().required('Category is required'),
  status: yup.string().required('Status is required')
})