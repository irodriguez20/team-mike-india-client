import React from 'react';
// import './SecretStashForm.css'

export default function upLiftForm(props) {
    const { className, ...otherProps } = props
    return (
        <form
            className={['upLift-form', className].join(' ')}
            action='#'
            {...otherProps}
        />
    )
}