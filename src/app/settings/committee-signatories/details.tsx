'use client'

import { useEffect, useState } from 'react'

import { getCommitteeSignatoryDetails } from '@actions/settings/committee-signatories-config'
import ModalLoader from '@components/common/modal-loader'
import StatusBadge from '@components/common/status-bedge'
import { Container, Group, Image, Table, Title, Text } from '@mantine/core'
import { formatDateTime } from '@utils/datetime.utils'
import { AiOutlineFileSearch } from 'react-icons/ai'

const Details = ({ id }: { id: number }) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        const response = await getCommitteeSignatoryDetails(Number(id))
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
            <span>Committee Signatory Details</span>
          </Group>
        </Title>
      </Group>

      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Name</Table.Th>
            <Table.Td>{details.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Position</Table.Th>
            <Table.Td>{details.position}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Signature</Table.Th>
            <Table.Td>
              {details.signature ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${details.signature}`}
                  alt={`${details.name}'s signature`}
                  width={150}
                  height={75}
                  style={{ objectFit: 'contain', border: '1px solid #dee2e6', borderRadius: '4px' }}
                />
              ) : (
                <Text size="sm" c="dimmed">
                  No signature uploaded
                </Text>
              )}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Status</Table.Th>
            <Table.Td>
              <StatusBadge status={details.status} />
            </Table.Td>
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
