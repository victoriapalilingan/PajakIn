import React from 'react';
import PropTypes from 'prop-types';

const IconSvg = ({source, size, color, style}) => {
  const Source = source;
  const iconSize = size || 24;
  const iconColor = color || '#FFF';

  return (
    <Source
      width={iconSize}
      height={iconSize}
      color={iconColor}
      style={style}
    />
  );
};

IconSvg.propTypes = {
  source: PropTypes.elementType.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default IconSvg;
