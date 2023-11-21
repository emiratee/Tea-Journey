import React, { useState } from 'react';
import '../../Styles/CaffeineLevel.css';

interface CaffeineLevelProps {
  caffeine: string;
}

const CaffeineLevel: React.FC<CaffeineLevelProps> = ({ caffeine }) => {
  const [dots, setDots] = useState<string | null>(null);

  switch (caffeine) {
    case 'None':
      setDots('None');
      break;
    case 'Very Low':
      setDots(dot(1, '#adff2f'));
      break;
    case 'Low':
      // Handle 'Low' case
      break;
    case 'Moderate':
      // Handle 'Moderate' case
      break;
    case 'High':
      // Handle 'High' case
      break;
    case 'Very High':
      // Handle 'Very High' case
      break;
    default:
      setDots('N/A');
  }

  function dot(coloredDots: number, color: string): string {
    let result = '';
    for (let i = 0; i < coloredDots; i++) {
      // Add colored dots
      result += (
        <span className="ColoredDot" style={{ backgroundColor: color }} />
      );
    }
    for (let i = coloredDots; i < 5; i++) {
      // Add white dots
      result += <span className="WhiteDot" />;
    }
    return result;
  }

  return <div className="Dot">{dots}</div>;
};

export default CaffeineLevel;
