import React from 'react'
import Brand from '../../Brand/Brand'
import styled from 'styled-components'
import Sidenav from '../../Sidenav/Sidenav'
import useSettings from 'app/hooks/useSettings'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'

const SidebarNavRoot = styled('div')(
    ({ width }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: width,
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        zIndex: 111,
        overflow: 'hidden',
        color: 'white',
        transition: 'all 250ms ease-in-out',
        backgroundImage: `linear-gradient(to bottom, rgb(34,42,69), rgb(34,42,69))`,
        '&:hover': {
            width: sideNavWidth,
            '& .sidenavHoverShow': {
                display: 'block',
            },
            '& .compactNavItem': {
                width: '100%',
                maxWidth: '100%',
                '& .nav-bullet': {
                    display: 'block',
                },
                '& .nav-bullet-text': {
                    display: 'none',
                },
            },
        },
    })
)

const NavListBox = styled('div')(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const Layout1Sidenav = () => {
    // const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return sidenavCompactWidth
            default:
                return sideNavWidth
        }
    }
    // const primaryRGB = convertHexToRGB(theme.palette.primary.main)

    const updateSidebarMode = sidebarSettings => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    return (
        <SidebarNavRoot
            // bgImgURL={bgImgURL}
            // primaryBg={primaryRGB}
            width={getSidenavWidth()}
        >
            <NavListBox>
                <Brand>
                    {/* <Hidden smDown> */}
                    {/* <Switch
                            onChange={handleSidenavToggle}
                            checked={leftSidebar.mode !== 'full'}
                            color="secondary"
                            size="small"
                        /> */}
                    {/* </Hidden> */}
                </Brand>
                <Sidenav />
            </NavListBox>
        </SidebarNavRoot>
    )
}

export default React.memo(Layout1Sidenav)
