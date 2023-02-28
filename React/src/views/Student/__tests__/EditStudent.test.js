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
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditStudent from '../EditStudent'
import { StudentAdded } from '../store/StudentSlice'
beforeAll(() => {
    store.dispatch(
        StudentAdded({
            id: 1,
            fname: 'fname',
            lname: 'lname',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Student/edit/1" replace />
                                }
                            />
                            <Route
                                path="Student/edit/:id"
                                element={<EditStudent />}
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

describe('testing view of StudentEdit Component', () => {
    test('should render EditStudent and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const fnameElement = screen.getByLabelText(/Fname/i)
        const lnameElement = screen.getByLabelText(/Lname/i)

        expect(saveStudentButtonElement).toBeInTheDocument()

        expect(fnameElement).toBeInTheDocument()
        expect(lnameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student edit form', async () => {
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
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStudentButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
