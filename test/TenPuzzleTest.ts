import path from "path";
import { solve } from "../src/TenPuzzle";
const fs = require("fs");

const verify = () => {
    /**
     *      @see https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%B3%E3%83%91%E3%82%BA%E3%83%AB#%E3%81%9D%E3%81%AE%E4%BB%96
     */
    const filePath = path.join(__dirname, "canBeSolved.json");
    const canBeSolved: string[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const canBeSolvedNumArray = canBeSolved.map((e) => [
        parseInt(e[0]),
        parseInt(e[1]),
        parseInt(e[2]),
        parseInt(e[3]),
    ]);

    canBeSolvedNumArray.forEach((e) => {
        const res = solve(e, 10);
        console.log(e, res);
        if (res.length === 0) {
            console.log("error!!");
            process.exit();
        }
    });
    console.log("verified!");
};
verify();
