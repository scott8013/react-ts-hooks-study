import React from 'react'
import { ProjectListScreen } from './screens/project-list'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { useAuth } from './context/auth-content'
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Button type={'link'} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      {/*<Nav>nav</Nav>*/}
      <Main>
        <ProjectListScreen />
      </Main>
      {/*<Aside>aside</Aside>*/}
      {/*<Footer>footer</Footer>*/}
    </Container>
  )
}

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: aliceblue;
// `
//
// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `

const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    'header header header'
    'main main main'
    'footer footer footer';
  height: 100vh;
`
const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgb(0, 0, 0, 0.1);
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled(Row)``
const Main = styled.main`
  grid-area: main;
`
const Nav = styled.nav`
  grid-area: nav;
`
const Aside = styled.aside`
  grid-area: aside;
`
const Footer = styled.footer`
  grid-area: footer;
`
const HeaderItem = styled.h3`
  margin-right: 3rem;
`
