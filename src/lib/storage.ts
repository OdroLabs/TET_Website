import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = process.env.DO_DEFAULT_REGION ?? "sfo3";
const BUCKET = process.env.DO_SPACE ?? "";
// DO_ENDPOINT / DO_CDN_ENDPOINT are bucket-specific hostnames
// (<bucket>.<region>.digitaloceanspaces.com); the S3 API itself lives at the
// bare regional endpoint and the SDK prepends the bucket subdomain itself.
const API_ENDPOINT = `https://${REGION}.digitaloceanspaces.com`;
const CDN_ENDPOINT = (process.env.DO_CDN_ENDPOINT ?? process.env.DO_ENDPOINT ?? "").replace(/\/$/, "");

// This site's folder inside the shared "ngowebsites" Space, so uploads from
// other sites in the same Space don't collide with TET's.
const PREFIX = "TET";

const client = new S3Client({
  endpoint: API_ENDPOINT,
  region: REGION,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY ?? "",
  },
});

export async function uploadToSpaces(
  filename: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  const key = `${PREFIX}/${filename}`;
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: "public-read",
    })
  );
  return `${CDN_ENDPOINT}/${key}`;
}
