import { Loader } from '@mantine/core'

const ModalLoader = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Loader color="#88304E" type="dots" />
    </div>
  )
}

export default ModalLoader