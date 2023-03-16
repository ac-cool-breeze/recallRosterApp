import dummyRoster from './dummyRoster.json';

const position = { x: 0, y: 0 };
const edgeType = 'step';

function rosterToNodesEdges(roster) {
  const nodes = roster.map((item) => ({
    id: item.id,
    data: { ...item },
    position: { x: 0, y: 0 },
  }));

  const edges = roster
    .filter((item) => item.rt)
    .map((item) => ({
      id: `e${item.id}-${item.rt}`,
      source: item.rt,
      target: item.id,
      type: edgeType,
    }));

  return { nodes, edges };
}

// Use this function to convert the data from dummyRoster.json
const { nodes, edges } = rosterToNodesEdges(dummyRoster);

export const initialNodes = nodes;
export const initialEdges = edges;
