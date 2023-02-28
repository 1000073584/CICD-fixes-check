import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editStudent } from './store/Student.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditStudent = () => {
    const { id: StudentId } = useParams()

    const Student = useSelector((state) =>
        state.Student.entities.find(
            (Student) => Student.id.toString() === StudentId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fname, setFname] = useState(Student.fname)
    const [lname, setLname] = useState(Student.lname)

    const handleFname = (e) => setFname(e.target.value)
    const handleLname = (e) => setLname(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editStudent({
                id: StudentId,
                fname,
                lname,
            })
        )
        navigate('/Student')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditStudent', path: '/Student' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="fname"
                                id="fnameInput"
                                onChange={handleFname}
                                value={fname}
                                validators={['required']}
                                label="Fname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="lname"
                                id="lnameInput"
                                onChange={handleLname}
                                value={lname}
                                validators={['required']}
                                label="Lname"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditStudent
