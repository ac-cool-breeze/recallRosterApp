import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import  dummyData from '../dummyRoster.json';
import { useState, useCallback } from 'react';
import CustomNode  from './CustomNode';
import dagre from 'dagre';

let iteratorX = 0;
let iteratorY = 0;
let parentNodes = [];
const initialEdges = [];

const nodeTypes = {
    customNode: CustomNode,
};

const newNodes = dummyData.map( ele =>{
  let reportsTo = {}

  if(ele.hasOwnProperty('rt')){ 
    reportsTo = { rt:ele.rt } 
    iteratorY = 150
    initialEdges.push({ id: `${ele.id}-${ele.rt}`, source: ele.id, target: ele.rt , type: 'step' })
  }
  // Step 1: Finding ParentNodes when looping through
  else {
    parentNodes = parentNodes.concat({"parent" : ele.id})
    iteratorY = 0
  }

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

console.log('parentNodes:', parentNodes)


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

