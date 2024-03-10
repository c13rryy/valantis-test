/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";

const password = process.env.API_SECRET;
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const authString = password + "_" + timestamp;
const authHash = crypto.createHash("md5").update(authString).digest("hex");

export async function fetchFromAPI(reqBody: any) {
  const response = await fetch(`https://api.valantis${process.env.API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authHash,
    },
    body: JSON.stringify(reqBody),
  });

  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to fetch from API");
  }

  const data = await response.json();

  return data;
}
