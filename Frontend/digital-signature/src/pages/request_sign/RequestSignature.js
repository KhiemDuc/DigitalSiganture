import { Container } from '@chakra-ui/layout'
import Content from '../../components/AccountContent'
import ShowUserInfo from '../../components/ShowUserInfo/ShowUserInfo'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../helpers/userInfoTheme'
import RequestNavigate from '../../components/RequestSignature/RequestNavigate'

export default function RequestSignature() {
  return (
    <ChakraProvider theme={theme}>
      <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl" style={{alignItems:'center', justifyContent:'center', height:'100%'}}>
        <RequestNavigate />
      </Container>
    </ChakraProvider>
  )
}