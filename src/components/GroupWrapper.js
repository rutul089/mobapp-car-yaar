import React from 'react';

import {Text, Spacing, Card} from './';

const GroupWrapper = ({title, children}) => {
  return (
    <>
      <Text>{title}</Text>
      <Spacing size="smd" />
      <Card>{children}</Card>
    </>
  );
};

export default GroupWrapper;
