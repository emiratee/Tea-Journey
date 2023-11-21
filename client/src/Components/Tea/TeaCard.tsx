import React, { useState } from 'react';
import '../../Styles/TeaCard.css';
import { useAuth } from '../../Utils/auth';
import TeaInformation from './TeaInformation';
import { Tea } from '../../../../interfaces/Tea';

interface TeaCardProps {
  tea: Tea;
}

const TeaCard: React.FC<TeaCardProps> = ({ tea }) => {
  const { userInfo, setUserInfo } = useAuth();
  const [isTeaInformationVisible, setTeaInformationVisible] = useState(false);

  return (
    <>
      {isTeaInformationVisible && (
        <TeaInformation
          tea={tea}
          setTeaInformationVisible={setTeaInformationVisible}
        />
      )}
      <div
        className="TeaCard"
        onClick={() => {
          setTeaInformationVisible(true);
        }}
      >
        <div
          className="Image"
          style={{ backgroundImage: `url(${tea.image})` }}
        ></div>
        <h3>{tea.name}</h3>
        <div className="Description">
          <p>Type: {tea.type}</p>
          <p>Origin: {tea.origin}</p>
          <p>Caffeine: {tea.caffeine}</p>
          <p>Temperature: {tea.temperature}</p>
        </div>
      </div>
    </>
  );
};

export default TeaCard;
