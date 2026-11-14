import { readFile, writeFile } from "node:fs/promises";

const file = "sw.js";
const re = /const V = "[^"]*";/;

// Usa o hash do commit no GitHub Actions; se não houver, usa data/hora (build local)
const commit = (process.env.GITHUB_SHA || "").slice(0, 7);
const id = commit || new Date().toISOString().replace(/\D/g, "").slice(0, 14);

const src = await readFile(file, "utf8");
if (!re.test(src)) {
  console.error("stamp-sw: linha 'const V = ...' não encontrada em sw.js");
  process.exit(1);
}

await writeFile(file, src.replace(re, `const V = "estoque-${id}";`));
console.log(`stamp-sw: versão do cache = estoque-${id}`);
