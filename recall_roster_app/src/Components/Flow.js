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
    if(iterator >= 1){
        if( iterator % 2 == 0 ){
            iteratorY += 50
        }
    }
    (iterator % 2 == 0) ? iteratorX += 155 : iteratorX += -155;
    iterator += 1;
    return({
        id: ele.id,
        position: { x: iteratorX, y: iteratorY},
        data: { label: ele.name},
        type: 'customNode'
    })
});



const initialNodes = [
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
      type: 'customNode',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
  ];

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