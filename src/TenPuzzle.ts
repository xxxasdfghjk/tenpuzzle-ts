import { TreeNode } from "../types/TreeNode";
import { allShuffled } from "./Permutation";

const inOrderSearchString = (node: TreeNode): string => {
    if (node.isLeaf) {
        return String(node.value);
    } else {
        let res = "(";
        const leftRes = inOrderSearchString(node.children[0]);
        res = res + leftRes + node.op;
        const rightRes = inOrderSearchString(node.children[1]);
        return res + rightRes + ")";
    }
};

const calcNode = (node: TreeNode): number => {
    if (node.isLeaf === true) {
        return node.value;
    } else {
        const calc1 = calcNode(node.children[0]);
        const calc2 = calcNode(node.children[1]);
        switch (node.op) {
            case "+":
                return calc1 + calc2;
            case "-":
                return calc1 - calc2;
            case "*":
                return calc1 * calc2;
            case "/":
                return calc1 / calc2;
        }
    }
};

const createAllTree = (array: number[]): TreeNode[] => {
    if (array.length === 0) {
        return [];
    } else if (array.length === 1) {
        return [{ value: array[0], isLeaf: true }];
    } else {
        let result: TreeNode[] = [];
        for (let i = 1; i < array.length; i++) {
            const left = createAllTree(array.slice(0, i));
            const right = createAllTree(array.slice(i));
            const res = left.flatMap((le) =>
                right.flatMap<TreeNode>((ri) => [
                    { isLeaf: false, op: "/", children: [le, ri] },
                    { isLeaf: false, op: "*", children: [le, ri] },
                    { isLeaf: false, op: "+", children: [le, ri] },
                    { isLeaf: false, op: "-", children: [le, ri] },
                ])
            );
            result = [...result, ...res];
        }
        return result;
    }
};

export const solve = (array: number[], result: number, all?: boolean): string[] => {
    const shuffles = allShuffled(array);
    const resultArray: string[] = [];
    for (const current of shuffles) {
        const trees = createAllTree(current);
        for (const tree of trees) {
            const res = calcNode(tree);
            if (Math.abs(res - result) < 0.0001) {
                const result = inOrderSearchString(tree);
                if (!all) return [result];
                resultArray.push(result);
            }
        }
    }
    return resultArray;
};
