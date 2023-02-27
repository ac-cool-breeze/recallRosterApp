import React, { useCallback } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import  dummyData from '../dummyRoster.json';
import CustomNode  from './CustomNode';

//import { initialNodes, initialEdges } from './dummy_nodes.js';

import './index.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 150;

const position = { x: 0, y: 0 };
let parentNodes = [];
const initialEdges = [];

const nodeTypes = {
    customNode: CustomNode,
};

const initialNodes = dummyData.map( ele =>{
  let reportsTo = {}

  if(ele.hasOwnProperty('rt')){ 
    reportsTo = { rt:ele.rt } 
    
  }
  // Step 1: Finding ParentNodes when looping through
  else {
    parentNodes = parentNodes.concat({"parent" : ele.id})
  }

  return({
      id: ele.id,
      position,
      data: { 
          name: ele.name,
          phone: ele.phone,
          address: ele.address,
          ...reportsTo
      },
      type: 'customNode'
  })
});

const makeEdges=()=>{
  dummyData.forEach(ele =>{
    initialEdges.push({ id: `${ele.id}-${ele.rt}`, source: ele.id, target: ele.rt , type: 'step' })
  })
}

makeEdges()
console.log('initEdges', initialEdges);


const getLayoutedElements = (nodes, edges, direction = 'BT') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'bottom';
    node.sourcePosition = isHorizontal ? 'right' : 'top';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div className="layoutflow">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
      <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
    </div>
  );
};

export default LayoutFlow;