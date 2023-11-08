import React from 'react'
import '../../Styles/BrewTimerSearchbar.css';

const BrewTimerSearchbar = ({ tea }) => {
    return (
        <>
            <div className="BrewTimerSearchbarTea">
                <p>{tea.name}</p>
            </div>
        </>
    )
}

export default BrewTimerSearchbar