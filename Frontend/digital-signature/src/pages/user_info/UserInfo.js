import { Container } from '@chakra-ui/layout'
import Content from '../../components/AccountContent'
import ShowUserInfo from '../../components/ShowUserInfo/ShowUserInfo'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../helpers/userInfoTheme'
import Cover from '../../components/Cover'

export default function Main() {
  return (
    <ChakraProvider theme={theme}>
      <Cover />
      <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
        <ShowUserInfo />
        <Content />
      </Container>
    </ChakraProvider>
  )
}