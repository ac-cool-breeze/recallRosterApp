import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div>
        {data.name}
      </div>
      <div>
        {data.phone}
      </div>
      <div>
        {data.address}
      </div>
    </>
  );
});