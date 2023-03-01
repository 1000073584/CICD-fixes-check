import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const TeacherList = Loadable(lazy(() => import('./TeacherList')))
const EditTeacher = Loadable(lazy(() => import('./EditTeacher')))
const AddTeacher = Loadable(lazy(() => import('./AddTeacher')))

const TeacherRoutes = [
    {
        path: '/Teacher',
        element: <TeacherList />,
    },
    {
        path: '/Teacher/edit/:id',
        element: <EditTeacher />,
    },
    {
        path: '/Teacher/add',
        element: <AddTeacher />,
    },
]

export default TeacherRoutes
