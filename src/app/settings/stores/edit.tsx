import { updateStore } from '@actions/settings/stores-config'
import { Button, Group, Radio, Select, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals, modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { storeValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition } from 'react'
import { MdOutlineCategory, MdOutlineLocalConvenienceStore, MdOutlineStorefront, MdUpdate as UpdateIcon } from 'react-icons/md'

const EditModal = ({ store, categories }: any) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm({
    validate: yupResolver(storeValidationSchema),
    initialValues: {
      store_no: store.store_no,
      store_name: store.store_name,
      floor_location: store.floor_location,
      category_id: String(store.category_id),
      status: String(store.status)
    }
  })

  /**
   * Handles the form submission.
   * Sends an API request to update the product details.
   */
  const submitHandler = (formData: any) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to update this store information ?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          const res = await updateStore(store.id!, formData)
          if (res.success) {
            showNotification(getSuccessMessage(res?.message)) // Show success notification
            closeAllModals() // Close the modal upon success
          } else {
            showNotification(getErrorMessage(res?.message)) // Show error notification
          }
        })
      }
    })
  }


  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Title order={4} mb="md">
        Update Store Information
      </Title>

      <Select
        label="Store Category"
        placeholder="Select Option"
        data={categories.map((data: any) => ({
          value: String(data.id),
          label: `${data.category_name}`
        }))}
        searchable
        withAsterisk
        mb="xs"
        leftSection={<MdOutlineCategory />} // Adds an icon
        {...getInputProps('category_id')}
      />

      <TextInput
        label="Store Number"
        mb="md"
        withAsterisk
        {...getInputProps('store_no')}
        leftSection={<MdOutlineLocalConvenienceStore />}
      />

      <TextInput
        label="Store Name"
        mb="md"
        withAsterisk
        {...getInputProps('store_name')}
        leftSection={<MdOutlineStorefront />}
      />

      <Textarea label="Floor Location" mb="xs" maxLength={255} withAsterisk {...getInputProps('floor_location')} />

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
