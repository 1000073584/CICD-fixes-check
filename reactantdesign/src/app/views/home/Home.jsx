import React from 'react'
import styled  from 'styled-components'
import { SimpleCard } from 'app/components'
import { useSelector } from 'react-redux'
const Container = styled('div')(({ theme }) => ({
    margin: '30px'
}))
const Home = () => {
    const loading = useSelector((state) => state.loading)
    return <Container>
        <SimpleCard title="Welcome">
                {loading ? (
                    'Loading...'
                ) : (
                    <div >
                        Welcome to React Antd CRUD
                    </div>
                )}
            </SimpleCard>
    </Container>
}

export default Home
