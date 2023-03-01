import React from 'react'
import useSettings from 'app/hooks/useSettings'
import { ThemeProvider } from 'styled-components'

const MatxTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }
    console.log(activeTheme)
    return (
        <ThemeProvider theme={activeTheme}>
            {children}
        </ThemeProvider>
    )
}

export default MatxTheme
