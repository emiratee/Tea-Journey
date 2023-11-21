import React from 'react';
import '../../Styles/BrewTimerSearchbar.css';
import { Tea } from '../../../../interfaces/Tea';

interface BrewTimerSearchbarProps {
  tea: Tea;
  setSelectedTea: (tea: Tea) => void;
}

const BrewTimerSearchbar: React.FC<BrewTimerSearchbarProps> = ({
  tea,
  setSelectedTea,
}) => {
  function selectTea() {
    setSelectedTea(tea);
  }

  return (
    <>
      <div className="BrewTimerSearchbarTea" onClick={selectTea}>
        <p>{tea.name}</p>
      </div>
    </>
  );
};

export default BrewTimerSearchbar;
