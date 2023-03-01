import React from 'react'
import { MatxLogo } from 'app/components'
import { Span } from '../../components/Typography'
import styled from 'styled-components'
import useSettings from 'app/hooks/useSettings'

const BrandRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 29px',
}))

const BrandBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }) => {
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <BrandRoot>
            <BrandBox>
                <MatxLogo />
                <StyledSpan mode={mode} className="sidenavHoverShow">
                reactantdesign
                </StyledSpan>
            </BrandBox>
            <div
                className="sidenavHoverShow"
                sx={{ display: mode === 'compact' ? 'none' : 'block' }}
            >
                {children || null}
            </div>
        </BrandRoot>
    )
}

export default Brand
