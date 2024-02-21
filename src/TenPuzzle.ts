const permutation = (array: number[]): Array<number[]> => {
    const size = array.length;
    if (size === 1) {
        return [[array[0]]];
    }
    const head = array[0];
    const subPerm = permutation(array.slice(1));
    let res: Array<number[]> = [];
    array.forEach((num) => {
        const replaced = subPerm.map((arr) => arr.map((elem) => (elem === num ? head : elem)));
        const addHead = replaced.map((e) => [num, ...e]);
        res = [...res, ...addHead];
    });
    return res;
};

const permutationArray = (num: number) => {
    return permutation(new Array(num).fill(0).map((e, i) => i));
};

type TreeNode =
    | {
          isLeaf: true;
          value: number;
      }
    | {
          children: [TreeNode, TreeNode];
          isLeaf: false;
          op: (typeof OPERATION)[number];
      };
const OPERATION = ["+", "-", "*", "/"] as const;

const inOrderSearch = (node: TreeNode) => {
    if (node.isLeaf) {
        process.stdout.write(String(node.value));
    } else {
        process.stdout.write("(");
        inOrderSearch(node.children[0]);
        process.stdout.write(node.op);
        inOrderSearch(node.children[1]);
        process.stdout.write(")");
    }
};

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

const allShuffled = (array: number[]): Array<number[]> => {
    const permutations = permutationArray(array.length);
    return permutations.map((e) => e.map((l) => array[l]));
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
