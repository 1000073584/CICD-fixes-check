import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const StyledLoading = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
        width: 'auto',
        height: '25px',
    },
    '& .circleProgress': {
        position: 'absolute',
        left: -7,
        right: 0,
        top: 'calc(50% - 25px)',
    },
}))

const Loading = () => {
    return (
        <StyledLoading>
            <div style={{ position: 'relative' }}>
                <Spin size="large" />
            </div>
        </StyledLoading>
    )
}

export default Loading
