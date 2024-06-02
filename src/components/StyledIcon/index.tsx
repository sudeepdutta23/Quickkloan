import React from 'react'

const StyledIcon = ({ icon, style }: any) => {
  return (<>{(
    React.createElement(icon, { style }))}</>)
}

export default StyledIcon;
