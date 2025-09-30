import { createStoreOwner } from '@actions/settings/store-owners-config'
import { Button, Group, Radio, Select, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals, modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { storeOwnerValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition } from 'react'
import { BiSave } from 'react-icons/bi'
import { MdEmail, MdPerson, MdPhone, MdStore } from 'react-icons/md'
import { RiIdCardLine } from 'react-icons/ri'

const AddModal = ({ stores }: any) => {
  console.log('stores', stores)
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm({
    validate: yupResolver(storeOwnerValidationSchema),
    initialValues: {
      store_id: '',
      owner_name: '',
      owner_nid: '',
      owner_contact: '',
      owner_email: '',
      sms_receiving_mobile: '',
      email_receiving_address: '',
      remarks: '',
      status: '1'
    }
  })

  const submitHandler = (formData: any) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to add this store owner?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          const res = await createStoreOwner(formData)
          if (res.success) {
            showNotification(getSuccessMessage(res?.message))
            closeAllModals()
          } else {
            showNotification(getErrorMessage(res?.message))
          }
        })
      }
    })
  }

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Title order={4} mb="md">
        Add Store Owner
      </Title>

      <Select
        label="Store"
        placeholder="Select Store"
        data={stores.map((store: any) => ({
          value: String(store.id),
          label: `${store.store_name} (${store.store_no}, ${store.floor_location})`
        }))}
        searchable
        withAsterisk
        mb="xs"
        leftSection={<MdStore />}
        {...getInputProps('store_id')}
      />

      <TextInput label="Owner Name" mb="xs" withAsterisk leftSection={<MdPerson />} {...getInputProps('owner_name')} />

      <TextInput
        label="NID Number"
        mb="xs"
        withAsterisk
        leftSection={<RiIdCardLine />}
        {...getInputProps('owner_nid')}
      />

      <TextInput
        label="Contact Number"
        mb="xs"
        withAsterisk
        leftSection={<MdPhone />}
        {...getInputProps('owner_contact')}
      />

      <TextInput
        label="Email Address"
        mb="xs"
        withAsterisk
        leftSection={<MdEmail />}
        {...getInputProps('owner_email')}
      />

      <TextInput
        label="SMS Receiving Mobile"
        mb="xs"
        leftSection={<MdPhone />}
        {...getInputProps('sms_receiving_mobile')}
      />

      <TextInput
        label="Email Receiving Address"
        mb="xs"
        leftSection={<MdEmail />}
        {...getInputProps('email_receiving_address')}
      />

      <Textarea label="Remarks" mb="xs" maxLength={255} {...getInputProps('remarks')} />

      <Radio.Group label="Status" withAsterisk mb="md" {...getInputProps('status')}>
        <Group mt="xs">
          <Radio value="1" label="Active" />
          <Radio value="0" label="Inactive" />
        </Group>
      </Radio.Group>

      <Button type="submit" leftSection={<BiSave />} loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

export default AddModal
