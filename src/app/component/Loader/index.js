import React from 'react';
import { Flex, Spin } from 'antd';

const Loader = () => (
  <Flex align="center" gap="middle">
    <Spin 
      size="large" 
      fullscreen={true}
      tip="Loading..."
    />
  </Flex>
);
export default Loader;