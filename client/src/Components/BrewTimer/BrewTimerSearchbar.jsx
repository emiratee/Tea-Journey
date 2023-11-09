import React from 'react'
import '../../Styles/BrewTimerSearchbar.css';

const BrewTimerSearchbar = ({ tea, setSelectedTea }) => {

    function selectTea() {
        setSelectedTea(tea)
    }

    return (
        <>
            <div className="BrewTimerSearchbarTea" onClick={selectTea}>
                <p>{tea.name}</p>
            </div>
        </>
    )
}

export default BrewTimerSearchbar