
import { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import 'antd/dist/antd.min.css';
import {AppstoreOutlined, RightOutlined} from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react'

const NavExpandRoot = styled('div')(() => ({
    '& .expandIcon': {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(90deg)',
    },
    '& .collapseIcon': {
        transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(0deg)',
    },
    '& .expansion-panel': {
        overflow: 'hidden',
        transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    },
    '&.compactNavItem': {
        width: 44,
        overflow: 'hidden',
        justifyContent: 'center !important',
        '& .itemText': {
            display: 'none',
        },
        '& .itemIcon': {
            display: 'none',
        },
    },
}))

const BaseButton = styled("div")(() => ({
    height: 44,
    width: '100%',
    whiteSpace: 'pre',
    overflow: 'hidden',
    paddingLeft: '16px',
    borderRadius: '4px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between !important',
    color: 'white',
    background: 'rgb(34,42,69)',
    border: "none",
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
    },
    '& .icon': {
        width: 36,
        fontSize: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
        verticalAlign: 'middle',
    },
}))

const BulletIcon = styled('div')(() => ({
    width: 4,
    height: 4,
    color: 'inherit',
    overflow: 'hidden',
    marginLeft: '20px',
    marginRight: '8px',
    borderRadius: '300px !important',
    background: 'white',
}))

const ItemText = styled('span')(() => ({
    fontSize: '0.875rem',
    paddingLeft: '0.8rem',
    verticalAlign: 'middle',
}))

const BadgeValue = styled('div')(() => ({
    padding: '1px 4px',
    overflow: 'hidden',
    borderRadius: '300px',
}))

const MatxVerticalNavExpansionPanel = ({ item, children, mode }) => {
    const [collapsed, setCollapsed] = useState(true)
    const elementRef = useRef(null)
    const componentHeight = useRef(0)
    const { pathname } = useLocation()
    const { name, icon, iconText, badge } = item

    const handleClick = () => {
        componentHeight.current = 0
        calcaulateHeight(elementRef.current)
        setCollapsed(!collapsed)
    }

    const calcaulateHeight = useCallback((node) => {
        if (node.name !== 'child') {
            for (let child of node.children) {
                calcaulateHeight(child)
            }
        }

        if (node.name === 'child') componentHeight.current += node.scrollHeight
        else componentHeight.current += 44 //here 44 is node height
        return
    }, [])

    useEffect(() => {
        if (!elementRef) return

        calcaulateHeight(elementRef.current)

        // OPEN DROPDOWN IF CHILD IS ACTIVE
        for (let child of elementRef.current.children) {
            if (child.getAttribute('href') === pathname) {
                setCollapsed(false)
            }
        }
    }, [pathname, calcaulateHeight])

    return (
        <NavExpandRoot>
            <BaseButton
                
                onClick={handleClick}
            >
                <div style={{display:"flex", alignItems:"center"}}>
                    {icon && <AppstoreOutlined/>}
                    {iconText && <BulletIcon />}
                    <ItemText className="sidenavHoverShow">{name}</ItemText>
                </div>
                {badge && (
                    <BadgeValue className="sidenavHoverShow itemIcon">
                        {badge.value}
                    </BadgeValue>
                )}
                <div style={{padding: "12px"}}>
                    <RightOutlined fontSize="small" />
                </div>
            </BaseButton>

            <div
                ref={elementRef}
                className="expansion-panel submenu"
                style={
                    collapsed
                        ? { maxHeight: '0px' }
                        : { maxHeight: componentHeight.current + 'px' }
                }
            >
                {children}
            </div>
        </NavExpandRoot>
    )
}

export default MatxVerticalNavExpansionPanel
