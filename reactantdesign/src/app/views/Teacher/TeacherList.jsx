import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteTeacher, fetchTeacher, message } from './store/Teacher.action'
import 'antd/dist/antd.min.css'
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { Spin, Button, Table, Space, Modal, Alert } from 'antd'

const Container = styled('div')(() => ({
    margin: '30px',
}))

const StyledIcon = styled('div')(() => ({
    fontSize: '20px',
    color: 'gray',
}))

const TeacherList = () => {
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.Teacher)
    const loading = useSelector((state) => state.Teacher.loading)

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this row?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(deleteTeacher({ id }))
                setTimeout(() => {
                    setShowAlert(true)
                }, 2)
            },
        })
    }

    const handleEdit = (id) => {
        navigate(`/Teacher/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/Teacher/add`)
    }

    useEffect(() => {
        dispatch(fetchTeacher())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        {
            title: 'Fname',
            dataIndex: 'fname',
            key: 'fname',
            width: '20%',
            align: 'left',
        },
        {
            title: 'Lname',
            dataIndex: 'lname',
            key: 'lname',
            width: '20%',
            align: 'left',
        },
        {
            key: 'Actions',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <Space>
                            <StyledIcon>
                                <EditFilled
                                    onClick={() => {
                                        handleEdit(record.id)
                                    }}
                                />
                            </StyledIcon>
                            <StyledIcon>
                                <DeleteFilled
                                    onClick={() => {
                                        handleDelete(record.id)
                                    }}
                                />
                            </StyledIcon>
                        </Space>
                    </>
                )
            },
        },
    ]
    return (
        <Container>
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Entities', path: '/Teacher' },
                            { name: 'Teacher' },
                        ]}
                    />
                </div>

                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        handleAdd()
                    }}
                >
                    Add Teacher
                </Button>

                <SimpleCard title="Teacher">
                    {loading ? (
                        <div
                            title="loading"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div style={{ height: 430, width: '100%' }}>
                            {message !== '' ? (
                                <Alert
                                    message={message}
                                    type="success"
                                    showIcon
                                    action={
                                        <Button size="small" type="text">
                                            UNDO
                                        </Button>
                                    }
                                    closable
                                />
                            ) : (
                                <></>
                            )}
                            <Table
                                dataSource={rows}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                            ></Table>
                        </div>
                    )}
                </SimpleCard>
            </Space>
        </Container>
    )
}

export default TeacherList
