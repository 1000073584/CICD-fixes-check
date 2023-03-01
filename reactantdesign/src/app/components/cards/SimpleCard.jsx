import React from 'react'
import { Card } from 'antd'
import 'antd/dist/antd.min.css'
import styled from 'styled-components'

const CardRoot = styled(Card)(() => ({
    height: '100%',
    padding: '20px 24px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
}))

const CardTitle = styled('div')(({ subtitle }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: !subtitle && '16px',
}))

const SimpleCard = ({ children, title, subtitle, icon }) => {
    return (
        <CardRoot>
            <CardTitle subtitle={subtitle}>{title}</CardTitle>
            {children}
        </CardRoot>
    )
}

export default SimpleCard
