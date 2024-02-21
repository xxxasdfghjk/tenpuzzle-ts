import { Operation } from "./Operation";

export type TreeNode =
    | {
          isLeaf: true;
          value: number;
      }
    | {
          children: [TreeNode, TreeNode];
          isLeaf: false;
          op: Operation;
      };
