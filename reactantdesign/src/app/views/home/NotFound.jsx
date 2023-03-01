import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const FlexBox = styled("div")(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    marginBottom: '32px',
}))

const NotFoundRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important',
}))

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <NotFoundRoot>
            <JustifyBox>
                <IMG src="/assets/images/illustrations/404.svg" alt="" />
                <Button
                    type="primary"
                    shape="round"
                    onClick={() => navigate(-1)}
                >
                    Back to Home
                </Button>
            </JustifyBox>
        </NotFoundRoot>
    )
}

export default NotFound
