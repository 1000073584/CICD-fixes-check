import React from 'react'
import 'antd/dist/antd.min.css'
import { Typography } from 'antd'
import styled from 'styled-components'
import { topBarHeight } from 'app/utils/constant'

const { Text } = Typography

const AppFooter = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: topBarHeight,
    '@media (max-width: 499px)': {
        display: 'table',
        width: '100%',
        minHeight: 'auto',
        padding: '1rem 0',
        '& .container': {
            flexDirection: 'column !important',
            '& a': {
                margin: '0 0 16px !important',
            },
        },
    },
}))

const FooterContent = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 1rem',
    maxWidth: '1170px',
    margin: '0 auto',
    color: '#fff',
}))

const Footer = () => {
    return (
        <div style={{ backgroundColor: 'rgb(34,42,69)' }} sx={{ zIndex: 96 }}>
            <AppFooter>
                <FooterContent>
                    <Text strong style={{ color: 'white', marginLeft: 'auto' }}>
                        @Hexaware Technologies | All rights reserved{' '}
                    </Text>
                </FooterContent>
            </AppFooter>
        </div>
    )
}

export default Footer
