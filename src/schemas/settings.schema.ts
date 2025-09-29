import * as yup from 'yup'

export const storeCategoriesValidationSchema = yup.object().shape({
  category_name: yup.string().trim().required('Category name is required'),
  status: yup.string().required('Status is required')
})
