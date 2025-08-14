import { Request, Response } from "express";
import puppeteer, { PDFOptions } from "puppeteer";

const options: PDFOptions = {
  format: "A4",
  printBackground: true
  // margin: { top: "16px", bottom: "16px" }
};

export const pdf = async (req: Request, res: Response) => {
  const url = req.query.url as string;
  if (url) {
    try {
      const browser = await puppeteer.launch({});
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });
      const pdf = await page.pdf(options);
      await browser.close();
      res.set("Content-Type", "application/pdf");
      res.send(pdf);
    } catch (e) {
      console.log(e);
    }
  }
};
