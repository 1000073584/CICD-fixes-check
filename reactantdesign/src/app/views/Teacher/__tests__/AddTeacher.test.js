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
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddTeacher from '../AddTeacher'

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    })
    const endPoint = 'Teacher'
    const getStudentListResponse = [
        {
            id: '1',
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
                        <AddTeacher />
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

describe('testing view TeacherAdd Component', () => {
    test('should render AddTeacher and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addTeacherButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        expect(addTeacherButtonElement).toBeInTheDocument()

        expect(fnameElement).toBeInTheDocument()
        expect(lnameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Teacher add form', async () => {
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        fireEvent.change(fnameElement, { target: { value: 'fname' } })
        fireEvent.change(lnameElement, { target: { value: 'lname' } })
    })
})
