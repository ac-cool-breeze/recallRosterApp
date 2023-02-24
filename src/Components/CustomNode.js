import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    let reportsTo = ""

    if(data.hasOwnProperty('rt')){
        reportsTo = <div style={{ color: 'red'}}>{data.rt}</div>

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