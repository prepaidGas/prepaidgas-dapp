import React from 'react';

interface HeadingProps {
  as?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  label?: number | string;
}

function Heading(props:HeadingProps) {
  const { as, children, className, id } = props;
  const StyledHeading:any = as ? as.toLowerCase() : 'h1';

  return (
    <StyledHeading className={className} id={id}>
      {children}
    </StyledHeading>
  );
}


export default Heading;
