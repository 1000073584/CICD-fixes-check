import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../services/notification/store/notificationSlice'
import { createLogger } from 'redux-logger'

let middlewares = [];
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });
    middlewares.push(logger)
}
export default configureStore(
    {
        reducer: {
            notification: notificationReducer
            
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
        devTools: process.env.NODE_ENV !== 'production',
    }
)
