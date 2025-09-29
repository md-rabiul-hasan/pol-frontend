'use client'

import { signIn, SignInResponse } from 'next-auth/react'
import { useState } from 'react'

import { Anchor, Button, Container, Group, Image, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { CgPassword as PasswordIcon, CgLogIn as SignInIcon } from 'react-icons/cg'
import { MdEmail } from "react-icons/md"

import { signInSchema } from '@schemas/auth.schema'
import { SignInValues } from '@types'
import classes from './styles.module.css'

const SignInUI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()

  const { onSubmit, getInputProps } = useForm<SignInValues>({
    validate: yupResolver(signInSchema),
    initialValues: {
      email: 'test@example.com',
      password: 'password'
    }
  })

  const submitHandler = async (values: SignInValues) => {
    setIsLoading(true)

    const response: SignInResponse | undefined = await signIn('credentials', { ...values, redirect: false })

    if (response?.error) {
      showNotification({
        title: response ? 'Unauthorized' : 'Unexpected Error',
        message: response ? response.error : 'An unexpected error occurred. Please try again.',
        icon: <ErrorIcon />,
        color: 'red'
      })

      setIsLoading(false)
      return
    }

    refresh()
    setIsLoading(false)
  }

  return (
    <div className={classes.root}>
      <Container size="xs" className={classes.container}>
        <Paper p={28} shadow="sm" radius="md" className={classes.paper}>
          <Group justify="center" gap="xs" mb="xl">
            <Image src="/images/logo-white.png" alt="ConnectPro" h={40} w="auto" />
          </Group>

          <form onSubmit={onSubmit(submitHandler)}>
            <Title size={25} mb={4} tt="uppercase" c="black">
              Sign In
            </Title>

            <Text size="sm" mb="md" c="black">
              Welcome back
            </Text>

            <TextInput
              label="Email"
              c="black"
              leftSectionPointerEvents="none"
              leftSection={<MdEmail />}
              label="Your email"
              placeholder="Your email"
              {...getInputProps('email')}
            />



            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              leftSection={<PasswordIcon />}
              c="black"
              withAsterisk
              mt="xs"
              {...getInputProps('password')}
            />

            <Button type="submit" leftSection={<SignInIcon />} mt="md" loading={isLoading} fullWidth>
              Sign In
            </Button>

            <Text ta="center" c="gray.5" size="xs" mt="xs">
              Note: Use{' '}
              <Anchor href="https://tools.sbacbank.com" c="inherit" size="xs" target="_blank">
                HRBook's
              </Anchor>{' '}
              password to Sign In
            </Text>
          </form>
        </Paper>
      </Container>

      <Text c="gray.2" size="xs" ta="center" className={classes.credits}>
        Designed & Developed by{' '}
        <Anchor c="gray.1" href="https://github.com/md-rabiul-hasan" target="_blank">
          Rabiul Hasan
        </Anchor>
      </Text>
    </div>
  )
}

export default SignInUI
