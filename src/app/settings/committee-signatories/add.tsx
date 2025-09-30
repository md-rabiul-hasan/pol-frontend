import { createCommitteeSignatory } from '@actions/settings/committee-signatories-config'
import { Button, FileInput, Group, Radio, Text, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals, modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { committeeSignatoryValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import { MdPerson, MdWork } from 'react-icons/md'
import { FaFileSignature } from 'react-icons/fa6'

const AddModal = () => {
  const [isLoading, startTransition] = useTransition()
  const [file, setFile] = useState<File | null>(null)

  const { onSubmit, getInputProps, setFieldValue } = useForm({
    validate: yupResolver(committeeSignatoryValidationSchema),
    initialValues: {
      name: '',
      position: '',
      signature: null,
      status: '1'
    }
  })

  const submitHandler = (formData: any) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to add this committee signatory?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          // Create FormData for file upload
          const submitData = new FormData()
          submitData.append('name', formData.name)
          submitData.append('position', formData.position)
          submitData.append('status', formData.status)
          if (file) {
            submitData.append('signature', file)
          }

          const res = await createCommitteeSignatory(submitData)
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

  const handleFileChange = (file: File | null) => {
    setFile(file)
    setFieldValue('signature', file)
  }

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Title order={4} mb="md">
        Add Committee Signatory
      </Title>

      <TextInput
        label="Name"
        placeholder="Enter full name"
        mb="xs"
        withAsterisk
        leftSection={<MdPerson />}
        {...getInputProps('name')}
      />

      <TextInput
        label="Position"
        placeholder="Enter position/designation"
        mb="xs"
        withAsterisk
        leftSection={<MdWork />}
        {...getInputProps('position')}
      />

      <FileInput
        label="Signature"
        placeholder="Choose signature image"
        mb="xs"
        accept="image/*"
        leftSection={<FaFileSignature />}
        value={file}
        onChange={handleFileChange}
        clearable
        description="Upload signature image (JPG, PNG, etc.)"
      />

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
