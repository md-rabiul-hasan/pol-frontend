'use client'

import { useEffect, useState } from 'react'

import { getStoreOwnerDetails } from '@actions/settings/store-owners-config'
import ModalLoader from '@components/common/modal-loader'
import StatusBadge from '@components/common/status-bedge'
import { Container, Group, Table, Title } from '@mantine/core'
import { formatDateTime } from '@utils/datetime.utils'
import { AiOutlineFileSearch } from 'react-icons/ai'

const Details = ({ id }: { id: number }) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        const response = await getStoreOwnerDetails(Number(id))
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
            <span>Store Owner Details</span>
          </Group>
        </Title>
      </Group>

      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={180}>Owner Name</Table.Th>
            <Table.Td>{details.owner_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Store</Table.Th>
            <Table.Td>
              {details.store.store_name} ({details.store.store_no}, {details.store.floor_location})
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>NID Number</Table.Th>
            <Table.Td>{details.owner_nid}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Contact Number</Table.Th>
            <Table.Td>{details.owner_contact}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Email Address</Table.Th>
            <Table.Td>{details.owner_email}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>SMS Receiving Mobile</Table.Th>
            <Table.Td>{details.sms_receiving_mobile}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Email Receiving Address</Table.Th>
            <Table.Td>{details.email_receiving_address}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Remarks</Table.Th>
            <Table.Td>{details.remarks || 'N/A'}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Status</Table.Th>
            <Table.Td>
              <StatusBadge status={details.status} />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Td>{details.user.name}</Table.Td>
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
