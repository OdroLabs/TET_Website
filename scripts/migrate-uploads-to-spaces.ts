import { readdir, readFile } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { uploadToSpaces } from "../src/lib/storage";

const prisma = new PrismaClient();

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

// Every String/String? column that can hold an "/uploads/..." path, either
// directly (image fields) or embedded in saved HTML (richtext fields).
const TARGETS: [string, string[]][] = [
  ["Setting", ["valueEn", "valueSi", "valueTa"]],
  ["Project", ["image", "image2", "image3", "contentEn", "contentSi", "contentTa"]],
  ["Service", ["image", "image2", "image3", "contentEn", "contentSi", "contentTa"]],
  ["Publication", ["coverImage"]],
  ["News", ["image", "image2", "image3", "contentEn", "contentSi", "contentTa"]],
  ["Event", ["image", "image2", "image3", "contentEn", "contentSi", "contentTa"]],
  ["GalleryImage", ["image"]],
  ["Product", ["image"]],
  ["Testimonial", ["photo"]],
  ["Partner", ["logo"]],
];

async function main() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const entries = (await readdir(uploadsDir)).filter((f) => f !== ".gitkeep");

  console.log(`Uploading ${entries.length} files to DigitalOcean Spaces...`);
  for (const filename of entries) {
    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";
    const bytes = await readFile(path.join(uploadsDir, filename));
    const url = await uploadToSpaces(filename, bytes, contentType);
    console.log(`  ${filename} -> ${url}`);
  }

  const cdnBase = (process.env.DO_CDN_ENDPOINT ?? process.env.DO_ENDPOINT ?? "").replace(/\/$/, "");
  const newPrefix = `${cdnBase}/TET/`;

  console.log("\nRewriting database references from /uploads/ to the CDN URL...");
  for (const [table, columns] of TARGETS) {
    for (const column of columns) {
      const result = await prisma.$executeRawUnsafe(
        `UPDATE "${table}" SET "${column}" = REPLACE("${column}", '/uploads/', $1) WHERE "${column}" LIKE '%/uploads/%'`,
        newPrefix
      );
      if (result > 0) console.log(`  ${table}.${column}: ${result} row(s) updated`);
    }
  }

  console.log("\nDone.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
