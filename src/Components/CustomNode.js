import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
  const renderSourceHandle = () => (
    <Handle
      type="source"
      position={Position.Top}
      id={`${data.id}-source`}
      isConnectable={isConnectable}
    />
  );

  const renderTargetHandle = () => (
    <Handle
      type="target"
      position={Position.Bottom}
      id={`${data.id}-target`}
      isConnectable={isConnectable}
    />
  );

  return (
    <>
      <div>{data.name}</div>
      <div>{data.phone}</div>
      <div>{data.address}</div>
      {data.hasOwnProperty('rt') && renderSourceHandle()}
      {(!data.hasOwnProperty('rt') || (data.hasOwnProperty('rt') && data.hasNoChildren !== true)) && renderTargetHandle()}
    </>
  );
});
