import { Request, Response } from "express";
import puppeteer, { Browser, LaunchOptions, PDFOptions } from "puppeteer";

const browserOptions: LaunchOptions = {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
};

const pdfOptions: PDFOptions = {
  format: "A4",
  printBackground: true
  // margin: { top: "16px", bottom: "16px" }
};

const getPage = async (browser: Browser, url: string) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const element: HTMLElement | null = document.getElementById("root");
    return element && element.innerText.trim().length > 0;
  });
  return page;
};

export const pdf = async (req: Request, res: Response) => {
  const url = req.query.url as string;
  console.log(url);
  if (url) {
    try {
      const browser = await puppeteer.launch(browserOptions);
      const page = await getPage(browser, url);
      const pdf = await page.pdf(pdfOptions);
      await browser.close();
      res.set("Content-Type", "application/pdf");
      res.send(pdf);
    } catch (e) {
      console.log(e);
    }
  }
};
