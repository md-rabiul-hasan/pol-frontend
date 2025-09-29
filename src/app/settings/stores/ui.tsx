'use client'

import { deleteStore } from '@actions/settings/stores-config'
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
import { AiOutlineFileSearch, AiTwotoneDelete } from "react-icons/ai"
import { FaPlusCircle } from 'react-icons/fa'
import { IoIosMore as MoreIcon } from 'react-icons/io'
import { TbEdit } from "react-icons/tb"
import AddModal from './add'
import Details from './details'
import EditModal from './edit'

// Define the props type

const StorePageUi = ({ data: { data, pagination }, categories }: any) => {
  const router = useRouter() // Use Next.js router for navigation
  // Get search parameters and navigation function
  const searchParams = useSearchParams()
  const { navigate } = useNavigation()

  // Manage search input state
  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400) // Debounce search input

  // Retrieve pagination parameters from URL
  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'

  // Handle pagination and search changes
  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val || '10' })

  const addHandler = () =>
    openModal({
      children: <AddModal categories={categories} />,
      centered: true,
      withCloseButton: false
    })

  const editHandler = (store: any) =>
    openModal({
      children: <EditModal store={store} categories={categories} />,
      centered: true,
      withCloseButton: false
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
      children: <Text size="sm">Are you sure you want to delete this?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        startTransition(async () => {
          const res = await deleteStore(id)
          if (res.success) {
            showNotification({ ...getSuccessMessage(res.message), autoClose: 10000 })
          } else {
            showNotification(getErrorMessage(res.message))
          }
        })
      }
    })
  }

  // Update the search query in URL whenever `search` changes
  useEffect(() => {
    navigate({ search, page: '1' }) // Reset to page 1 on search
  }, [search])

  return (
    <Container fluid>
      {/* Page title and search input */}
      <Group justify="space-between" mb="xs">
        <TitleBar title="Store List" url="/" />
        <Group gap="xs">
          <TextInput
            placeholder="Search Here"
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

      {/* Product Table */}
      <Paper shadow="xs" mb="xs">
        <Table verticalSpacing={8} horizontalSpacing={8} striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>SL</Table.Th>
              <Table.Th>Store Name</Table.Th>
              <Table.Th>Store No</Table.Th>
              <Table.Th>Floor Location</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.length > 0 ? (
              data.map((store: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{store.store_name}</Table.Td>
                  <Table.Td>{store.store_no}</Table.Td>
                  <Table.Td>{store.floor_location}</Table.Td>
                  <Table.Td>{store.category.category_name}</Table.Td>
                  <Table.Td>
                    <StatusBadge status={store.status} />
                  </Table.Td>
                  <Table.Td>{store.user.name}</Table.Td>
                  <Table.Td>
                    <Menu withArrow>
                      <Menu.Target>
                        <ActionIcon variant="subtle" size="sm">
                          <MoreIcon />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item onClick={() => editHandler(store)}>
                          <Group align="center" gap="xs">
                            <TbEdit size={16} />
                            <span>Edit</span>
                          </Group>
                        </Menu.Item>
                        <Menu.Item onClick={() => detailsHandler(store.id)}>
                          <Group align="center" gap="xs">
                            <AiOutlineFileSearch size={16} />
                            <span>Details</span>
                          </Group>
                        </Menu.Item>
                        <Menu.Item onClick={() => deleteHandler(store.id)}>
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
                  Store  not found
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Pagination Controls */}
      <TableNav
        listName="Stores"
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

export default StorePageUi
