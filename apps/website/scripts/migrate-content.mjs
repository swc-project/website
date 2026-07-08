/*
  HISTORICAL: one-shot migration of the old Nextra app's content into this
  Rspress app's docs/. The Nextra source app has since been removed, so the
  SRC path below no longer exists; kept for reference only.

  Transforms:
  - nextra/components imports -> rspress/theme (Tabs/Tab) and @components/Callout
  - <Tabs items={[...]}> / <Tabs.Tab> -> <Tabs> / <Tab label="...">
  - code fence `filename="x"` -> `title="x"`, drop nextra-only `copy` attr
  - next/link imports -> plain <a>
  - `components/...` import paths -> `@components/...`
*/
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const SRC = path.resolve(here, "../../website-nextra-removed/content");
const DST = path.resolve(here, "../docs");

const componentImportMap = [
  [
    /import Authors, \{ Author \} from ['"].*authors['"];?/,
    "import Authors, { Author } from '@components/Authors';",
  ],
  [
    /import Benchmark from ['"].*benchmarks\/dynamic['"];?/,
    "import Benchmark from '@components/Benchmark';",
  ],
  [
    /import Customers from ['"].*Customers['"];?/,
    "import Customers from '@components/Customers';",
  ],
  [
    /import TeamMembers from ['"].*TeamMembers['"];?/,
    "import TeamMembers from '@components/TeamMembers';",
  ],
  [
    /import TypeDeclarations from ['"].*TypeDeclarations['"];?/,
    "import TypeDeclarations from '@components/TypeDeclarations';",
  ],
];

function convertFences(text) {
  return text
    .split("\n")
    .map((line) => {
      if (!line.trimStart().startsWith("```")) return line;
      let out = line.replace(/filename=(".*?")/, "title=$1");
      out = out.replace(/\s+copy\s*$/, "");
      return out;
    })
    .join("\n");
}

function convertTabs(text) {
  // Replace each <Tabs items={[...]}> block, pairing Tabs.Tab with items in order.
  const lines = text.split("\n");
  const out = [];
  const itemStack = [];
  for (let line of lines) {
    const open = line.match(
      /<Tabs items=\{\[(.*?)\]\}\s*(defaultIndex=\{\d+\})?\s*>/
    );
    if (open) {
      const items = [...open[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
      itemStack.push({ items, idx: 0 });
      out.push(
        line.replace(
          /<Tabs items=\{\[.*?\]\}\s*(defaultIndex=\{\d+\})?\s*>/,
          "<Tabs>"
        )
      );
      continue;
    }
    if (line.includes("<Tabs.Tab>")) {
      const top = itemStack[itemStack.length - 1];
      const label =
        top && top.items[top.idx] !== undefined ? top.items[top.idx] : "";
      if (top) top.idx += 1;
      line = line.replace("<Tabs.Tab>", `<Tab label="${label}">`);
    }
    if (line.includes("</Tabs.Tab>")) {
      line = line.replaceAll("</Tabs.Tab>", "</Tab>");
    }
    if (line.includes("</Tabs>")) {
      itemStack.pop();
    }
    out.push(line);
  }
  return out.join("\n");
}

function convertImports(text) {
  const lines = text.split("\n");
  const kept = [];
  let usedLink = false;
  for (const line of lines) {
    if (/^import .* from ['"]nextra\/components['"];?\s*$/.test(line)) continue;
    if (/^import Link from ['"]next\/link['"];?\s*$/.test(line)) {
      usedLink = true;
      continue;
    }
    let replaced = line;
    for (const [re, sub] of componentImportMap) {
      if (re.test(replaced)) replaced = replaced.replace(re, sub);
    }
    kept.push(replaced);
  }
  let text2 = kept.join("\n");
  if (usedLink) {
    text2 = text2
      .replaceAll(/<Link\s+href=/g, "<a href=")
      .replaceAll("</Link>", "</a>");
  }
  return text2;
}

function insertThemeImports(text, original) {
  const needsTabs = /<Tabs[\s>]/.test(text);
  const needsCallout = /<Callout[\s>]/.test(text);
  const imports = [];
  if (needsTabs)
    imports.push("import { Tab, Tabs } from '@rspress/core/theme';");
  if (needsCallout) imports.push("import Callout from '@components/Callout';");
  if (imports.length === 0) return text;

  const lines = text.split("\n");
  // Insert after frontmatter if present, else at top.
  let insertAt = 0;
  if (lines[0] === "---") {
    const end = lines.indexOf("---", 1);
    if (end !== -1) insertAt = end + 1;
  }
  lines.splice(insertAt, 0, "", ...imports);
  return lines.join("\n");
}

function migrateFile(src, dst) {
  let text = fs.readFileSync(src, "utf8");
  text = convertImports(text);
  text = convertTabs(text);
  text = convertFences(text);
  text = insertThemeImports(text);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, text);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(SRC, full);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      migrateFile(full, path.join(DST, rel));
      console.log("migrated", rel);
    } else if (entry.name === "_meta.js") {
      // handled manually
    } else {
      // static assets referenced relatively (e.g. compatibility/overview.png)
      const dst = path.join(DST, rel);
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(full, dst);
      console.log("copied  ", rel);
    }
  }
}

walk(SRC);
