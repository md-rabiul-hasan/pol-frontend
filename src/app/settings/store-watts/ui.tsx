'use client'

import { deleteStoreWatt } from '@actions/settings/store-watts-config'
import StatusBadge from '@components/common/status-bedge'
import TableNav from '@components/common/table-nav'
import TitleBar from '@components/common/title-bar'
import useNavigation from '@hooks/useNavigation'
import { ActionIcon, Container, Group, Menu, Paper, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { modals, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'
import { AiOutlineFileSearch, AiTwotoneDelete } from 'react-icons/ai'
import { FaPlusCircle } from 'react-icons/fa'
import { IoIosMore as MoreIcon } from 'react-icons/io'
import { TbEdit } from 'react-icons/tb'
import AddModal from './add'
import Details from './details'
import EditModal from './edit'
import { formatDate } from '@utils/datetime.utils'

const StoreWattsPageUi = ({ data: { data, pagination }, stores }: any) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { navigate } = useNavigation()

  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val || '10' })

  const addHandler = () =>
    openModal({
      children: <AddModal stores={stores} />,
      centered: true,
      withCloseButton: false,
      size: 'md'
    })

  const editHandler = (storeWatt: any) =>
    openModal({
      children: <EditModal storeWatt={storeWatt} stores={stores} />,
      centered: true,
      withCloseButton: false,
      size: 'md'
    })

  const detailsHandler = (id: number) =>
    openModal({
      children: <Details id={id} />,
      centered: true,
      size: 'lg',
      withCloseButton: false
    })

  const deleteHandler = (id: number) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Are you sure you want to delete this store watt configuration?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          const res = await deleteStoreWatt(id)
          if (res.success) {
            showNotification({ ...getSuccessMessage(res.message), autoClose: 10000 })
          } else {
            showNotification(getErrorMessage(res.message))
          }
        })
      }
    })
  }

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  return (
    <Container fluid>
      <Group justify="space-between" mb="xs">
        <TitleBar title="Store Watts Configuration" url="/" />
        <Group gap="xs">
          <TextInput
            placeholder="Search by store name..."
            miw={400}
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
          />
          <Tooltip label="Add New" withArrow position="bottom">
            <ActionIcon onClick={addHandler}>
              <FaPlusCircle />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <Paper shadow="xs" mb="xs">
        <Table verticalSpacing={8} horizontalSpacing={8} striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>SL</Table.Th>
              <Table.Th>Store</Table.Th>
              <Table.Th>Usable Watt</Table.Th>
              <Table.Th>Lights</Table.Th>
              <Table.Th>Fans</Table.Th>
              <Table.Th>AC Units</Table.Th>
              <Table.Th>Effective Date</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.length > 0 ? (
              data.map((watt: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{watt.store.store_name}</Table.Td>
                  <Table.Td>{watt.usable_watt} W</Table.Td>
                  <Table.Td>{watt.no_of_light}</Table.Td>
                  <Table.Td>{watt.no_of_fan}</Table.Td>
                  <Table.Td>{watt.ac_unit}</Table.Td>
                  <Table.Td>{formatDate(watt.effective_date)}</Table.Td>
                  <Table.Td>
                    <Menu withArrow>
                      <Menu.Target>
                        <ActionIcon variant="subtle" size="sm">
                          <MoreIcon />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item onClick={() => editHandler(watt)}>
                          <Group align="center" gap="xs">
                            <TbEdit size={16} />
                            <span>Edit</span>
                          </Group>
                        </Menu.Item>
                        <Menu.Item onClick={() => detailsHandler(watt.id)}>
                          <Group align="center" gap="xs">
                            <AiOutlineFileSearch size={16} />
                            <span>Details</span>
                          </Group>
                        </Menu.Item>
                        <Menu.Item onClick={() => deleteHandler(watt.id)}>
                          <Group align="center" gap="xs">
                            <AiTwotoneDelete size={16} />
                            <span>Delete</span>
                          </Group>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={8} align="center">
                  Store watt configurations not found
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      <TableNav
        listName="Store Watt Configurations"
        limit={limit}
        limitHandler={handleLimitChange}
        page={pagination?.current_page!}
        pageHandler={handlePageChange}
        totalPages={pagination?.last_page!}
        totalRecords={pagination?.total!}
      />
    </Container>
  )
}

export default StoreWattsPageUi
