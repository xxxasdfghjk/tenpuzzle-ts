import { z } from "zod";
import { solve } from "./TenPuzzle";
const printStr = (elem: any) => {
    return process.stdout.write(String(elem) + "\n");
};

const inputString = (prompt: string): Promise<string> => {
    const readline = require("readline");
    const readInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) =>
        readInterface.question(prompt, (inputString: string) => {
            readInterface.close();
            resolve(inputString);
        })
    );
};

const inputStrSchema = z
    .string()
    .regex(/(\d+\s)+/)
    .transform((e) => e.split(/\s+/).map((elem) => parseInt(elem, 10)));

const inputAnswerSchema = z
    .string()
    .regex(/\d+/)
    .transform((elem) => parseInt(elem, 10));

const solveTenPuzzle = async () => {
    try {
        const inputNumbers = await inputString("数値列を入力");
        const numberArrays = inputStrSchema.parse(inputNumbers);
        const answer = await inputString("答えを入力");
        const answerNumber = inputAnswerSchema.parse(answer);
        console.log(solve(numberArrays, answerNumber, true));
    } catch (e) {
        printStr("不正なフォーマット");
    }
};
solveTenPuzzle();
