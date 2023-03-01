import React, { Fragment } from 'react'
import styled from 'styled-components'

const MenuButton = styled('div')(() => ({
    display: 'inline-block',
    color: 'black',
    '& div:hover': {
        backgroundColor: '#F0F0F0',
    },
}))

const MatxMenu = props => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    return (
        <Fragment>
            <MenuButton onClick={handleClick}>{props.menuButton}</MenuButton>
            {/* <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={props.data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
        //   avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
        />
      </List.Item>
    )}
  /> */}
        </Fragment>
    )
}

export default MatxMenu
