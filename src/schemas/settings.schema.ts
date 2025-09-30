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

export const storeOwnerValidationSchema = yup.object({
  store_id: yup.string().required('Store is required'),
  owner_name: yup.string().required('Owner name is required'),
  owner_nid: yup.string().required('NID is required'),
  owner_contact: yup.string().required('Contact number is required'),
  sms_receiving_mobile: yup.string().matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Enter a valid Bangladeshi mobile number'),
  status: yup.string().required('Status is required')
})
