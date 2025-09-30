import { updateStoreWatt } from '@actions/settings/store-watts-config'
import { Button, Group, NumberInput, Select, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { closeAllModals, modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { storeWattValidationSchema } from '@schemas/settings.schema'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useTransition } from 'react'
import {
  MdCalendarToday,
  MdElectricBolt,
  MdOutlineAcUnit,
  MdOutlineLight,
  MdStore,
  MdUpdate as UpdateIcon
} from 'react-icons/md'
import { PiFanLight } from 'react-icons/pi'

const EditModal = ({ storeWatt, stores }: any) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm({
    validate: yupResolver(storeWattValidationSchema),
    initialValues: {
      store_id: String(storeWatt.store_id),
      usable_watt: storeWatt.usable_watt,
      no_of_light: storeWatt.no_of_light,
      no_of_fan: storeWatt.no_of_fan,
      ac_unit: storeWatt.ac_unit,
      effective_date: storeWatt.effective_date.split('T')[0], // Format date for input
      remarks: storeWatt.remarks || ''
    }
  })

  const submitHandler = (formData: any) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to update this store watt configuration?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          const res = await updateStoreWatt(storeWatt.id!, formData)
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
        Update Store Watt Configuration
      </Title>

      <Select
        label="Store"
        placeholder="Select Store"
        data={stores.map((store: any) => ({
          value: String(store.id),
          label: `${store.store_name} (${store.store_no})`
        }))}
        searchable
        withAsterisk
        mb="xs"
        leftSection={<MdStore />}
        {...getInputProps('store_id')}
      />

      <NumberInput
        label="Usable Watt (W)"
        placeholder="Enter usable wattage"
        mb="xs"
        withAsterisk
        hideControls
        min={0}
        step={0.01}
        decimalScale={2}
        leftSection={<MdElectricBolt />}
        {...getInputProps('usable_watt')}
      />

      <NumberInput
        label="Number of Lights"
        placeholder="Enter number of lights"
        mb="xs"
        withAsterisk
        hideControls
        min={0}
        leftSection={<MdOutlineLight />}
        {...getInputProps('no_of_light')}
      />
      <NumberInput
        label="Number of Fans"
        placeholder="Enter number of fans"
        mb="xs"
        withAsterisk
        hideControls
        min={0}
        leftSection={<PiFanLight />}
        {...getInputProps('no_of_fan')}
      />
      <NumberInput
        label="AC Units"
        placeholder="Enter number of AC units"
        mb="xs"
        withAsterisk
        hideControls
        min={0}
        leftSection={<MdOutlineAcUnit />}
        {...getInputProps('ac_unit')}
      />

      <TextInput
        type="date"
        label="Effective Date"
        mb="xs"
        withAsterisk
        leftSection={<MdCalendarToday />}
        {...getInputProps('effective_date')}
      />

      <Textarea
        label="Remarks"
        placeholder="Additional notes or comments"
        mb="md"
        rows={3}
        {...getInputProps('remarks')}
      />

      <Button type="submit" leftSection={<UpdateIcon />} loading={isLoading}>
        Update
      </Button>
    </form>
  )
}

export default EditModal
