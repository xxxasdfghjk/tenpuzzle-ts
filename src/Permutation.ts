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
    return permutation(new Array(num).fill(0).map((_, i) => i));
};

export const allShuffled = (array: number[]): Array<number[]> => {
    const permutations = permutationArray(array.length);
    return permutations.map((e) => e.map((l) => array[l]));
};
