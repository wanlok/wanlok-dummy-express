import { Request, Response } from "express";
import puppeteer from "puppeteer";
import fs from "fs";

export const pdf = async (req: Request, res: Response) => {
  const url = req.query.url as string;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const [baseUrl, hash] = url.split("#");
    const fullUrl = hash ? `${baseUrl}#${hash}` : baseUrl;

    await page.goto(fullUrl, { waitUntil: "networkidle0" });

    // Wait for hydration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Dump HTML for inspection
    const html = await page.content();
    fs.writeFileSync("debug.html", html);
    console.log("HTML dumped to debug.html");

    // Capture screenshot
    await page.screenshot({ path: "debug.png", fullPage: true });

    await browser.close();

    // Send image
    const imageBuffer = fs.readFileSync("debug.png");
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (e) {
    console.error("Screenshot error:", e);
    res.status(500).send("Failed to capture screenshot");
  }
};
