import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(import.meta.dirname, "..");
const svgPath = join(root, "app", "icon.svg");
const svg = await readFile(svgPath);

const icon512 = await sharp(svg).resize(512, 512).png().toBuffer();
await writeFile(join(root, "app", "icon.png"), icon512);

const apple180 = await sharp(svg).resize(180, 180).png().toBuffer();
await writeFile(join(root, "app", "apple-icon.png"), apple180);

const faviconSizes = [16, 32, 48];
const faviconBuffers = await Promise.all(
  faviconSizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
);
const ico = await toIco(faviconBuffers);
await writeFile(join(root, "app", "favicon.ico"), ico);

console.log("Created app/icon.png (512×512)");
console.log("Created app/apple-icon.png (180×180)");
console.log("Created app/favicon.ico (16, 32, 48)");
