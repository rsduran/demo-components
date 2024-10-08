import React from 'react';
import { Button, useStyleConfig } from '@chakra-ui/react';

const CopyReferralButton = (props) => {
  const styles = useStyleConfig('CopyReferralButton');

  return (
    <Button __css={styles} {...props}>
      {props.children}
    </Button>
  );
};

export default CopyReferralButton;