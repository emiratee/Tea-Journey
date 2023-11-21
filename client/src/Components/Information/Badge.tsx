import React from 'react';

interface BadgeProps {
  img: string;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ img, text }) => {
  return (
    <div className="Badge">
      <img src={img} alt="Badge" />
      <div className="Badge-Popup">{text}</div>
    </div>
  );
};

export default Badge;
