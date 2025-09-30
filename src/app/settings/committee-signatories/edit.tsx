import { updateCommitteeSignatory } from '@actions/settings/committee-signatories-config'
import { Button, FileInput, Group, Image, Radio, Text, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals, modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { committeeSignatoryValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition, useState } from 'react'
import { MdPerson, MdWork, MdUpdate as UpdateIcon } from 'react-icons/md'
import { FaFileSignature } from 'react-icons/fa6'

const EditModal = ({ signatory }: any) => {
  const [isLoading, startTransition] = useTransition()
  const [file, setFile] = useState<File | null>(null)

  const { onSubmit, getInputProps, setFieldValue } = useForm({
    validate: yupResolver(committeeSignatoryValidationSchema),
    initialValues: {
      name: signatory.name,
      position: signatory.position,
      signature: null,
      status: String(signatory.status)
    }
  })

  const submitHandler = (formData: any) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to update this committee signatory?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          // Create FormData for file upload
          const submitData = new FormData()
          submitData.append('name', formData.name)
          submitData.append('position', formData.position)
          submitData.append('status', formData.status)
          submitData.append('_method', 'PUT') // For Laravel PUT method with FormData

          if (file) {
            submitData.append('signature', file)
          }

          const res = await updateCommitteeSignatory(signatory.id!, submitData)
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
        Update Committee Signatory
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
        placeholder="Choose new signature image"
        mb="xs"
        accept="image/*"
        leftSection={<FaFileSignature />}
        value={file}
        onChange={handleFileChange}
        clearable
        description="Upload new signature image to replace existing one"
      />

      {signatory.signature && !file && (
        <Group mb="xs">
          <Text size="sm" fw={500}>
            Current Signature:
          </Text>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${signatory.signature}`}
            alt={`${signatory.name}'s signature`}
            width={100}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </Group>
      )}

      <Radio.Group label="Status" withAsterisk mb="md" {...getInputProps('status')}>
        <Group mt="xs">
          <Radio value="1" label="Active" />
          <Radio value="0" label="Inactive" />
        </Group>
      </Radio.Group>

      <Button type="submit" leftSection={<UpdateIcon />} loading={isLoading}>
        Update
      </Button>
    </form>
  )
}

export default EditModal
