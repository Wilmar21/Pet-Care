import React from "react"

export const Notify = ({errorMassage}) => {
    if( !errorMassage ) return null

    return (
        <div style={{ color: 'red', position: 'fixed', top: 0, width: '100%' }}>
            {errorMassage}
        </div>
    )
}