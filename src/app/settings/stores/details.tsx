'use client'

import { useEffect, useState } from 'react'

import { getStoreDetails } from '@actions/settings/stores-config'
import ModalLoader from '@components/common/modal-loader'
import StatusBadge from '@components/common/status-bedge'
import { Container, Group, Table, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { formatDateTime } from '@utils/datetime.utils'
import { AiOutlineFileSearch } from "react-icons/ai"

const Details = ({ id }: { id: number }) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true) // Loading state

  const [visible, { toggle }] = useDisclosure(true)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        const response = await getStoreDetails(Number(id))
        setDetails(response?.data || null)
      } catch (error) {
        setDetails(null)
      } finally {
        setLoading(false) // Stop loading after fetch
      }
    }

    fetchDetails()
  }, [id])

  if (loading) return <ModalLoader />

  return (
    <Container size="sm">
      <Group justify="space-between" mb="xs">
        <Title order={4} ta="center">
          <Group align="center" gap="xs">
            <AiOutlineFileSearch size={20} />
            <span>Details</span>
          </Group>
        </Title>
      </Group>

      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Store No</Table.Th>
            <Table.Td>{details.store_no}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Store Name</Table.Th>
            <Table.Td>{details.store_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Floor Location</Table.Th>
            <Table.Td>{details.floor_location}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th w={160}>Category</Table.Th>
            <Table.Td>{details.category.category_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th w={160}>User</Table.Th>
            <Table.Td>{details.user.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th w={160}>Status</Table.Th>
            <Table.Td><StatusBadge status={details.status} /></Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th w={160}>Last Modified</Table.Th>
            <Table.Td>{formatDateTime(details.updated_at)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  )
}

export default Details
