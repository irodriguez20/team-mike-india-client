import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { tokenService } from '../../services/token-service'

export default function PrivateRoute({ component, ...props }) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                tokenService.hasAuthToken()
                    ? <Component {...componentProps} />
                    : <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: componentProps.location }
                        }}
                    />
            )}
        />
    )
}
