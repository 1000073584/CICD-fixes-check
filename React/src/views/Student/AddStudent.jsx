import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addStudent } from './store/Student.action'

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

const AddStudent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')

    const handleFname = (e) => setFname(e.target.value)
    const handleLname = (e) => setLname(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addStudent({
                fname,
                lname,
            })
        )
        navigate('/Student')
    }

    useEffect(() => {
        return () => {
            setFname('')
            setLname('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddStudent', path: '/Student' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
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
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddStudent
