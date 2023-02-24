import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import  dummyData from '../dummyRoster.json';
import { useState, useCallback } from 'react';
import CustomNode  from './CustomNode';

let iteratorX = 0;
let iteratorY = 0;
let iterator = 0;

const nodeTypes = {
    customNode: CustomNode,
};

const newNodes = dummyData.map( ele =>{
    let reportsTo = {}
    
    if(iterator >= 1){
        if( iterator % 2 == 0 ){
            iteratorY += 100
        }
    }
    (iterator % 2 == 0) ? iteratorX += 255 : iteratorX += -255;
    iterator += 1;

    if(ele.hasOwnProperty('rt')){ reportsTo = { rt:ele.rt } }

    return({
        id: ele.id,
        position: { x: iteratorX, y: iteratorY},
        data: { 
            name: ele.name,
            phone: ele.phone,
            address: ele.address,
            ...reportsTo
        },
        type: 'customNode'
    })
});

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];

function Flow() {

    const [nodes, setNodes] = useState(newNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
      );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
      );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow         
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;