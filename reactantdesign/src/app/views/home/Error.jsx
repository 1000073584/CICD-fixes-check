import React from 'react'
import { Button } from 'antd'
import styled  from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';

const { Title } = Typography;

const FlexBox = styled("div")(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    maxWidth: 350,
    flexDirection: 'column',
    justifyContent: 'center',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    marginBottom: '32px',
}))

const ErrorRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important',
}))

export const myErrorHandler = (error, info) => {
    console.log(error)
    console.log(info)
}
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate()
    
    return (
        <ErrorRoot>
            <JustifyBox>
                <IMG src="/assets/images/illustrations/designer.svg" alt="" />
                <Title level={2}>Something Went Wrong</Title>
                <Title level={4}>Contact Administrator</Title>
                <Button
                    type="primary"
                    shape="round"
                    onClick={() => {
                        navigate('/')
                        resetErrorBoundary()
                    }}
                >
                    Back to Home
                </Button>
            </JustifyBox>
        </ErrorRoot>
    )
}

export default ErrorFallback
