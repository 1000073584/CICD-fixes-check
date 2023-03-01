const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditTeacher from '../EditTeacher'
import { TeacherAdded } from '../store/TeacherSlice'
beforeAll(() => {
    store.dispatch(
        TeacherAdded({
            id: 1,
            fname: 'fname',
            lname: 'lname',
        })
    )
})

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
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Teacher/edit/1" replace />
                                }
                            />
                            <Route
                                path="Teacher/edit/:id"
                                element={<EditTeacher />}
                            />
                        </Routes>
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

describe('testing view of TeacherEdit Component', () => {
    test('should render EditTeacher and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveTeacherButtonElement = screen.getByRole('button', {
            name: /Update/i,
        })
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        expect(saveTeacherButtonElement).toBeInTheDocument()

        expect(fnameElement).toBeInTheDocument()
        expect(lnameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Teacher edit form', async () => {
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        fireEvent.change(fnameElement, { target: { value: 'fname' } })
        fireEvent.change(lnameElement, { target: { value: 'lname' } })

        expect(fnameElement.value).toBe('fname')

        expect(lnameElement.value).toBe('lname')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        fireEvent.change(fnameElement, { target: { value: '' } })
        fireEvent.change(lnameElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveTeacherButtonElement = screen.getByRole('button', {
            name: /Update/i,
        })

        await clickAndWait(saveTeacherButtonElement)

        const errorList = await screen.findAllByText('This field is required')
        expect(errorList).toHaveLength(2)
    })
})
