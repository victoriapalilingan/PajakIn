import React from 'react';

const IconSvg = ({source: Source, size = 24, color = '#FFF', style}) => {
  return <Source width={size} height={size} color={color} style={style} />;
};

export default IconSvg;
