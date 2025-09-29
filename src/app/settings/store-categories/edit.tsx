import { updateStoreCategory } from '@actions/settings/store-categories-config'
import { Button, Group, Radio, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { storeCategoriesValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition } from 'react'
import { MdUpdate as UpdateIcon } from 'react-icons/md'
import { MdOutlineCategory } from 'react-icons/md'

const EditModal = ({ store_category }: any) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm({
    validate: yupResolver(storeCategoriesValidationSchema),
    initialValues: {
      category_name: store_category.category_name,
      status: String(store_category.status)
    }
  })

  /**
   * Handles the form submission.
   * Sends an API request to update the product details.
   */
  const submitHandler = (formData: any) =>
    startTransition(async () => {
      const res = await updateStoreCategory(store_category.id!, formData)
      if (res.success) {
        showNotification(getSuccessMessage(res?.message)) // Show success notification
        closeAllModals() // Close the modal upon success
      } else {
        showNotification(getErrorMessage(res?.message)) // Show error notification
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Title order={4} mb="md">
        Update Store Category
      </Title>

      <TextInput
        label="Category Name"
        mb="md"
        withAsterisk
        placeholder="Enter category name"
        {...getInputProps('category_name')}
        leftSection={<MdOutlineCategory />}
      />

      <Radio.Group label="Status" withAsterisk mb="md" {...getInputProps('status')}>
        <Group mt="xs">
          <Radio value="1" label="Active" />
          <Radio value="0" label="Inactive" />
        </Group>
      </Radio.Group>

      {/* Submit Button */}
      <Button type="submit" leftSection={<UpdateIcon />} loading={isLoading}>
        Update
      </Button>
    </form>
  )
}

export default EditModal
