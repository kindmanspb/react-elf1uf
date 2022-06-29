export interface Id {
  id: number | string;
}

export interface ParentId {
  parentId: number | string;
}

export interface NodeModel<T = unknown> extends ParentId, Id {
  text: string;
  [key: string]: any;
}

export const mutateTree = <T>(
  tree: NodeModel<T>[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"]
): NodeModel<T>[] =>
  tree.map((node) => {
    if (node.id === dragSourceId) {
      return {
        ...node,
        parentId: dropTargetId,
      };
    }

    return node;
  });

type TreeItem<T> = T & { children: TreeItem<T>[] };

export function buildTree<T>(array: T[], elementKey: keyof T, parentKey: keyof T): TreeItem<T>[] {
    let tree = [] as TreeItem<T>[];
    for (let i = 0; i < array.length; i++) {
        if (array[i][parentKey]) {
            let parent = array.filter(elem => elem[elementKey] === array[i][parentKey]).pop() as TreeItem<T>;
            if (!parent['children']) {
                parent.children = [];
            }
            parent.children.push(array[i] as TreeItem<T>)
        } else {
            tree.push(array[i] as TreeItem<T>);
        }
    }
    return tree;
}

export const reorder = <T>(list: T[], startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
