import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import styled from 'styled-components'
import { Span } from '../../../components/Typography'
import { MatxMenu, MatxSearchBox } from 'app/components'
import {
    MenuFoldOutlined,
    HomeFilled,
    ProfileFilled,
    SettingFilled,
    LockFilled,
    UserOutlined,
} from '@ant-design/icons'
import { Button, Avatar } from 'antd'
import { Menu, Space } from 'antd'
import { topBarHeight } from 'app/utils/constant'

const TopbarRoot = styled('div')(() => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    height: topBarHeight,
}))

const TopbarContainer = styled('div')(() => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'white',
    paddingLeft: 16,
    paddingRight: 16,
}))

const UserMenu = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(Menu)(() => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: 'black',
    },
}))

const Layout1Topbar = () => {
    const { settings, updateSettings } = useSettings()
    const { logout, user } = useAuth()

    const updateSidebarMode = sidebarSettings => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode
        mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        updateSidebarMode({ mode })
    }

    return (
        <TopbarRoot>
            <TopbarContainer>
                <div style={{ display: 'flex' }}>
                    <MenuFoldOutlined
                        style={{ fontSize: '26px' }}
                        onClick={handleSidebarToggle}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Space>
                        <MatxSearchBox />

                        <MatxMenu
                            menuButton={
                                <UserMenu>
                                    {/* <Hidden xsDown> */}
                                    <Span>
                                        Hi{' '}
                                        <strong>{user.name ?? 'User'}</strong>
                                    </Span>
                                    {/* </Hidden> */}
                                    <Avatar
                                        size="large"
                                        icon={<UserOutlined />}
                                    />
                                </UserMenu>
                            }
                        >
                            <StyledItem>
                                <Link to="/">
                                    <HomeFilled />
                                    <Span> Home </Span>
                                </Link>
                            </StyledItem>
                            <StyledItem>
                                <Link to="/page-layouts/user-profile">
                                    <ProfileFilled />
                                    <Span> Profile </Span>
                                </Link>
                            </StyledItem>
                            <StyledItem>
                                <SettingFilled />
                                <Span> Settings </Span>
                            </StyledItem>
                            <StyledItem onClick={logout}>
                                <LockFilled />
                                <Span> Logout </Span>
                            </StyledItem>
                        </MatxMenu>
                    </Space>
                </div>
            </TopbarContainer>
        </TopbarRoot>
    )
}

export default React.memo(Layout1Topbar)
