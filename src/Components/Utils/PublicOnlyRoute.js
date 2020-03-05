import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { tokenService } from '../../services/token-service'

export default function PublicOnlyRoute({ component, ...props }) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                tokenService.hasAuthToken()
                    ? <Redirect to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    )
}
