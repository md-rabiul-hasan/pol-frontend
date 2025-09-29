import { createStoreCategory } from '@actions/settings/store-categories-config'
import { Button, Group, Radio, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { storeCategoriesValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition } from 'react'
import { BiSave } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'

const AddModal = () => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm({
    validate: yupResolver(storeCategoriesValidationSchema),
    initialValues: {
      category_name: '',
      status: '1' // Changed to string to match Radio value
    }
  })

  /**
   * Handles the form submission.
   * Sends an API request to create a new store category.
   */
  const submitHandler = (formData: any) =>
    startTransition(async () => {
      const res = await createStoreCategory(formData)
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
        Add Store Category
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
      <Button type="submit" leftSection={<BiSave />} loading={isLoading} fullWidth>
        Submit
      </Button>
    </form>
  )
}

export default AddModal
