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

export const storeWattValidationSchema = yup.object({
  store_id: yup.string().required('Store is required'),
  usable_watt: yup
    .number()
    .required('Usable watt is required')
    .positive('Usable watt must be positive')
    .typeError('Usable watt must be a number'),
  no_of_light: yup
    .number()
    .required('Number of lights is required')
    .min(0, 'Number of lights cannot be negative')
    .integer('Number of lights must be a whole number')
    .typeError('Number of lights must be a number'),
  no_of_fan: yup
    .number()
    .required('Number of fans is required')
    .min(0, 'Number of fans cannot be negative')
    .integer('Number of fans must be a whole number')
    .typeError('Number of fans must be a number'),
  ac_unit: yup
    .number()
    .required('AC units is required')
    .min(0, 'AC units cannot be negative')
    .integer('AC units must be a whole number')
    .typeError('AC units must be a number'),
  effective_date: yup.string().required('Effective date is required'),
  remarks: yup.string().max(500, 'Remarks cannot exceed 500 characters')
})

export const committeeSignatoryValidationSchema = yup.object({
  name: yup.string().required('Name is required').max(100, 'Name cannot exceed 100 characters'),
  position: yup.string().required('Position is required').max(100, 'Position cannot exceed 100 characters'),
  signature: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true // File is optional for update
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024 // 5MB limit
      }
      return true
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true // File is optional for update
      if (value instanceof File) {
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
      }
      return true
    }),
  status: yup.string().required('Status is required')
})
