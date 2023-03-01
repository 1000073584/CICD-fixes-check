
import styled from 'styled-components'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import useSettings from 'app/hooks/useSettings'
import { Typography } from 'antd'
import { Badge} from 'antd';
import Icon from '@ant-design/icons';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel'

const {Paragraph} = Typography

const ListLabel = styled(Paragraph)(({ mode }) => ({
    fontSize: '12px',
    marginTop: '20px',
    marginLeft: '15px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    display: mode === 'compact' && 'none',
    color: "white",
}))

const ExtAndIntCommon = {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '4px',
    height: 44,
    whiteSpace: 'pre',
    marginBottom: '8px',
    textDecoration: 'none',
    justifyContent: 'space-between',
    transition: 'all 150ms ease-in',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
    },
    '&.compactNavItem': {
        overflow: 'hidden',
        justifyContent: 'center !important',
    },
    '& .icon': {
        fontSize: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
        verticalAlign: 'middle',
    },
}
const ExternalLink = styled('a')(() => ({
    ...ExtAndIntCommon,
    color: "white",
}))

const InternalLink = styled("div")(() => ({
    '& a': {
        ...ExtAndIntCommon,
        color: "white",
    },
    '& .navItemActive': {
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
    },
}))

const StyledText = styled("span")(({ mode }) => ({
    fontSize: '0.875rem',
    paddingLeft: '0.1rem',
    display: mode === 'compact' && 'none',
}))

const BulletIcon = styled('span')(() => ({
    marginLeft: '24px',
    overflow: 'hidden',
}))

const BadgeValue = styled('div')(() => ({
    padding: '1px 8px',
    overflow: 'hidden',
    borderRadius: '300px',
}))

const MatxVerticalNav = ({ items }) => {
    const { settings } = useSettings()
    const { mode } = settings.layout1Settings.leftSidebar

    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.type === 'label')
                return (
                    <ListLabel
                        key={index}
                        mode={mode}
                        className="sidenavHoverShow"
                    >
                        {item.label}
                    </ListLabel>
                )
            if (item.children) {
                return (
                    <MatxVerticalNavExpansionPanel
                        mode={mode}
                        item={item}
                        key={index}
                    >
                        {renderLevels(item.children)}
                    </MatxVerticalNavExpansionPanel>
                )
            } else if (item.type === 'extLink') {
                return (
                    <ExternalLink
                        key={index}
                        href={item.path}
                        className={`${mode === 'compact' && 'compactNavItem'}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <div
                            key={item.name}
                            name="child"
                            sx={{ width: '100%' }}
                        >
                            {(() => {
                                if (item.icon) {
                                    return (
                                        <Icon className="icon">
                                            {item.icon}
                                        </Icon>
                                    )
                                } else {
                                    return (
                                        <span className="item-icon icon-text">
                                            {item.iconText}
                                        </span>
                                    )
                                }
                            })()}
                            <StyledText
                                mode={mode}
                                className="sidenavHoverShow"
                            >
                                {item.name}
                            </StyledText>
                            <div style={{mx:"auto"}} ></div>
                            {item.badge && (
                                <BadgeValue>{item.badge.value}</BadgeValue>
                            )}
                        </div>
                    </ExternalLink>
                )
            } else {
                return (
                    <InternalLink key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `navItemActive ${mode === 'compact' && 'compactNavItem'}` : `${mode === 'compact' && 'compactNavItem'}`
                            }
                        >
                            <div
                                key={item.name}
                                name="child"
                                style={{display:"flex", alignItems:"center"}}
                            >
                                {item?.icon ? (
                                    {/* <Icon className="icon" sx={{ width: 36 }}>
                                        {item.icon}
                                    </Icon> */}
                                ) : (
                                    <Fragment>
                                        <BulletIcon>
                                        <Badge color="white" />
                                        </BulletIcon>
                                    </Fragment>
                                )}
                                <StyledText>
                                    {item.name}
                                </StyledText>
                            </div>
                        </NavLink>
                    </InternalLink>
                )
            }
        })
    }

    return <div className="navigation">{renderLevels(items)}</div>
}

export default React.memo(MatxVerticalNav)
