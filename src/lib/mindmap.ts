interface Node {
  nodeView: { content: string };
  children: Node[];
}

const createGraph = (contents: any[][]) => {
  let root: Node | undefined;

  const visited: Record<string, Node> = {};

  for (const row of contents) {
    let parent = undefined;
    for (const col of row) {
      const value = col || "";

      const key = `${row.indexOf(col)}-${value}`;

      if (!visited[key]) {
        const node = { nodeView: { content: value }, children: [] };
        visited[key] = node;

        if (parent) {
          parent.children.push(visited[key]);
        } else {
          root = node;
        }
      }

      parent = visited[key];
    }
  }

  return root;
};

export const createMindmap = async (contents: any[][]) => {
  const root = createGraph(contents);

  await miro.board.experimental.createMindmapNode(root);
};
