import Footer from '../../Footer/Footer'
import Layout1Topbar from './Layout1Topbar'
import { MatxSuspense } from 'app/components'
import Layout1Sidenav from './Layout1Sidenav'
import Scrollbar from 'react-perfect-scrollbar'
import useSettings from 'app/hooks/useSettings'
import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'
import { Outlet } from 'react-router-dom'

const Layout1Root = styled('div')(({ theme }) => ({
    display: 'flex',
    background: '#fafafa',
}))

const ContentBox = styled('div')(() => ({
    height: '100%',
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
}))

const StyledScrollBar = styled(Scrollbar)(() => ({
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
}))

const LayoutContainer = styled('div')(({ width }) => ({
    height: '100vh',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    verticalAlign: 'top',
    marginLeft: width,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    // marginRight: secondarySidebar.open ? 50 : 0,
}))

const Layout1 = () => {
    const { settings} = useSettings()
    const { layout1Settings } = settings
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings

    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return sideNavWidth
            case 'compact':
                return sidenavCompactWidth
            default:
                return '0px'
        }
    }

    const sidenavWidth = getSidenavWidth()
    // const theme = useTheme()
    // const isMdScreen = useMediaQuery()

    const ref = useRef({ settings })
    // const layoutClasses = `theme-${theme.palette.type}`

    useEffect(() => {
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        // if (settings.layout1Settings.leftSidebar.show) {
        //     let mode = isMdScreen ? 'close' : sidebarMode
        //     updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout1Root>
            {showSidenav && sidenavMode !== 'close' && <Layout1Sidenav />}

            <LayoutContainer
                width={sidenavWidth}
                // secondarySidebar={secondarySidebar}
            >
                {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                    // <Layout1Topbar fixed={true} />

                    <Layout1Topbar fixed={true} className="elevation-z8" />
                )}
                {settings.perfectScrollbar && (
                    <StyledScrollBar>
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                // <Layout1Topbar />

                                <Layout1Topbar />
                            )}
                        <div style={{ flexGrow: '1', position: 'relative' }}>
                            <MatxSuspense>
                                {/* {renderRoutes(routes)} */}
                                <Outlet />
                            </MatxSuspense>
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </StyledScrollBar>
                )}

                {!settings.perfectScrollbar && (
                    <ContentBox>
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                // <Layout1Topbar />

                                <Layout1Topbar />
                            )}
                        <div style={{ flexGrow: '1', position: 'relative' }}>
                            <MatxSuspense>
                                {/* {renderRoutes(routes)} */}
                                <Outlet />
                            </MatxSuspense>
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </ContentBox>
                )}

                {settings.footer.show && settings.footer.fixed && <Footer />}
            </LayoutContainer>
            {/* {settings.secondarySidebar.show && <SecondarySidebar />} */}
        </Layout1Root>
    )
}

export default React.memo(Layout1)
