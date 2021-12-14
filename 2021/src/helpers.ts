import fs from "fs";
import path from "path";

export function loadInputSync(day: number, dev = false) {
  const contents = fs.readFileSync(path.join(__dirname, "../assets", `day${day}${dev ? "-test" : ""}.txt`), { encoding: "utf8" });
  return contents.split("\n");
}