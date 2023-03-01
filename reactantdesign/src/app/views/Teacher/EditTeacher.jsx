import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Input, Select, Space } from 'antd'
import 'antd/dist/antd.min.css'
import { EditOutlined } from '@ant-design/icons'
import { editTeacher } from './store/Teacher.action'
import styled from 'styled-components'
import React, { useState } from 'react'

const Container = styled('div')(() => ({
    margin: '30px',
}))

const EditTeacher = () => {
    const { id: TeacherId } = useParams()

    const Teacher = useSelector((state) =>
        state.Teacher.entities.find(
            (Teacher) => Teacher.id.toString() === TeacherId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fname, setFname] = useState(Teacher.fname)
    const [lname, setLname] = useState(Teacher.lname)

    const handleFname = (e) => setFname(e.target.value)
    const handleLname = (e) => setLname(e.target.value)

    const handleClick = (e) => {
        dispatch(
            editTeacher({
                id: TeacherId,
                fname,
                lname,
            })
        ).then(() => navigate('/Teacher'))
    }

    return (
        <Container>
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditTeacher', path: '/Teacher' },
                        { name: 'Form' },
                    ]}
                />
                <SimpleCard title="Edit Form">
                    <Form
                        initialValues={{ fname: fname, lname: lname }}
                        autoComplete="off"
                        wrapperCol={{ span: 10 }}
                        layout="vertical"
                        onFinish={(values) => {
                            handleClick(values)
                        }}
                        onFinishFailed={(error) => {
                            console.log({ error })
                        }}
                    >
                        <Form.Item
                            name="fname"
                            label="Fname"
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input size="large" onChange={handleFname} />
                        </Form.Item>

                        <Form.Item
                            name="lname"
                            label="Lname"
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input size="large" onChange={handleLname} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 6 }}>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<EditOutlined />}
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </SimpleCard>
            </Space>
        </Container>
    )
}

export default EditTeacher
