import React from 'react'
import 'antd/dist/antd.min.css'
import styled from 'styled-components'
import { RightOutlined, HomeFilled } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'

const BreadcrumbRoot = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}))

const BreadcrumbName = styled('h4')(() => ({
    margin: 0,
    fontSize: '16px',
    paddingBottom: '1px',
    verticalAlign: 'middle',
    textTransform: 'capitalize',
}))

const SubName = styled('span')(() => ({
    textTransform: 'capitalize',
    color: 'gray',
}))

const Separator = styled('h4')(() => ({
    margin: 0,
    marginLeft: 8,
    paddingBottom: '3px',
    color: 'gray',
}))

const StyledIcon = styled(HomeFilled)(() => ({
    marginLeft: 8,
    marginBottom: '4px',
    verticalAlign: 'middle',
    color: '#1E90FF',
}))

const Breadcrumbs = ({ routeSegments }) => {
    return (
        <BreadcrumbRoot>
            {routeSegments ? (
                <>
                    <BreadcrumbName>
                        {routeSegments[routeSegments.length - 1]['name']}
                    </BreadcrumbName>
                    <Separator>|</Separator>
                </>
            ) : null}
            <Breadcrumb separator={<RightOutlined />}>
                <Breadcrumb.Item>
                    <NavLink to="/">
                        <StyledIcon>
                            <HomeFilled />
                        </StyledIcon>
                    </NavLink>
                </Breadcrumb.Item>

                {routeSegments
                    ? routeSegments.map((route, index) => {
                          return index !== routeSegments.length - 1 ? (
                              <Breadcrumb.Item>
                                  <NavLink key={index} to={route.path}>
                                      <SubName>{route.name}</SubName>
                                  </NavLink>
                              </Breadcrumb.Item>
                          ) : (
                              <Breadcrumb.Item>
                                  <SubName key={index}>{route.name}</SubName>
                              </Breadcrumb.Item>
                          )
                      })
                    : null}
            </Breadcrumb>
        </BreadcrumbRoot>
    )
}

export default Breadcrumbs
