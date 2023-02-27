import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    let reportsTo = ""

    if(data.hasOwnProperty('rt')){
        reportsTo = (
          <div style={{ color: 'red'}}>
            {/* {data.rt} */}
            <Handle type="source" position={Position.Top} id={`${data.id}-source`} />
            <Handle type="target" position={Position.Bottom} id={`${data.id}-target`} />
          </div>
          )
    } else {
      reportsTo = (
        <Handle type="target" position={Position.Bottom} id={`${data.id}-target`} />
      )
    }

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
        {reportsTo}
    </>
  );
});