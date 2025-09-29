import { Badge } from '@mantine/core'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

interface StatusBadgeProps {
  status: number | string | boolean
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Normalize status to number for comparison
  const statusValue = typeof status === 'boolean' ? (status ? 1 : 0) : Number(status)

  if (statusValue === 1) {
    return (
      <Badge color="green" variant="light" leftSection={<FaCircleCheck size={12} />} size="md">
        Active
      </Badge>
    )
  }

  return (
    <Badge color="red" variant="light" leftSection={<FaCircleXmark size={12} />} size="md">
      Inactive
    </Badge>
  )
}

export default StatusBadge
