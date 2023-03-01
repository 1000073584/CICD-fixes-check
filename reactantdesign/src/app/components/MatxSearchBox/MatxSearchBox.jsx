import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { topBarHeight } from 'app/utils/constant'
import { Input } from 'antd'
import { Space } from 'antd'

const SearchContainer = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: topBarHeight,
    background: 'white',
    color: 'black',
    '&::placeholder': {
        color: 'white',
    },
}))

const SearchInput = styled(Input)(() => ({
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    paddingLeft: '20px',
    height: 'calc(100% - 5px)',
    background: 'white',
    color: 'black',
    '&::placeholder': {
        color: 'white',
    },
}))

const MatxSearchBox = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    return (
        <React.Fragment>
            {!open && (
                <SearchOutlined style={{ fontSize: '20px' }} onClick={toggle} />
            )}

            {open && (
                <Space>
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            placeholder="Search here..."
                            autoFocus
                        />
                        <CloseOutlined
                            style={{ fontSize: '16px' }}
                            onClick={toggle}
                        />
                    </SearchContainer>
                </Space>
            )}
        </React.Fragment>
    )
}

export default MatxSearchBox
