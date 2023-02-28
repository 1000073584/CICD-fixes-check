const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddStudent from '../AddStudent'

beforeEach(() => {
    const endPoint = 'Student'
    const getStudentListResponse = [
        {
            id: 1,
            fname: 'fname',
            lname: 'lname',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStudent />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view StudentAdd Component', () => {
    test('should render AddStudent and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        expect(addStudentButtonElement).toBeInTheDocument()

        expect(fnameElement).toBeInTheDocument()
        expect(lnameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student add form', async () => {
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        fireEvent.change(fnameElement, { target: { value: 'fname' } })
        fireEvent.change(lnameElement, { target: { value: 'lname' } })
    })

    test('should return error message when add Student button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStudentButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
