import React from 'react'
import { SearchPanel } from 'screens/project-list/search-panel'
import { List } from 'screens/project-list/list'
import { useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from '../../utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useAsync } from '../../utils/use-async'
import { Project } from 'screens/project-list/list'
import { useProjects } from '../../utils/project'
// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce(param, 200)
  const client = useHttp()
  const { error, data: list, isLoading } = useProjects(debouncedParam)
  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List users={users} dataSource={list || []} loading={isLoading} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
