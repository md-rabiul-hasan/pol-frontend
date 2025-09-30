'use client'

import { useEffect, useState } from 'react'

import { getStoreWattDetails } from '@actions/settings/store-watts-config'
import ModalLoader from '@components/common/modal-loader'
import { Container, Group, Table, Title, Text } from '@mantine/core'
import { formatDate, formatDateTime } from '@utils/datetime.utils'
import { AiOutlineFileSearch } from 'react-icons/ai'

const Details = ({ id }: { id: number }) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        const response = await getStoreWattDetails(Number(id))
        setDetails(response?.data || null)
      } catch (error) {
        setDetails(null)
      } finally {
        setLoading(false)
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
            <span>Store Watt Configuration Details</span>
          </Group>
        </Title>
      </Group>

      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={180}>Store</Table.Th>
            <Table.Td>
              <div>
                <Text fw={500}>{details.store.store_name}</Text>
                <Text size="sm" c="dimmed">
                  {details.store.store_no}
                </Text>
                <Text size="sm">{details.store.floor_location}</Text>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Usable Watt</Table.Th>
            <Table.Td>{details.usable_watt} W</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Number of Lights</Table.Th>
            <Table.Td>{details.no_of_light}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Number of Fans</Table.Th>
            <Table.Td>{details.no_of_fan}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>AC Units</Table.Th>
            <Table.Td>{details.ac_unit}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Effective Date</Table.Th>
            <Table.Td>{formatDate(details.effective_date)}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Remarks</Table.Th>
            <Table.Td>{details.remarks || 'N/A'}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Created By</Table.Th>
            <Table.Td>{details.user.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Created At</Table.Th>
            <Table.Td>{formatDateTime(details.created_at)}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Last Modified</Table.Th>
            <Table.Td>{formatDateTime(details.updated_at)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  )
}

export default Details
