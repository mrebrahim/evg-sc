const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://proxy.toolip.io:31113'
    ]
  });

  const page = await browser.newPage();
  await page.authenticate({
    username: '8c5906b99fbd1c0bcd0f916d545c565aa8f310f87f2dfc5c06afa3d92d52cea53f3669f2a1b7a7585fafd9f9d243f153f461d633edff0ff268b8e78c4e435948453396296a4d1d4d9278bdcbcf3b7520',
    password: 'gpmn6fj4gg3q'
  });

  console.log("🚀 Logging in...");
  await page.goto("https://evg.ae/_layouts/EVG/Login.aspx?language=ar", { waitUntil: "networkidle2" });

  await page.click('#ctl00_cphScrollMenu_rbtnCompany');
  await page.type('#ctl00_cphScrollMenu_txtCompnayTCF', '1140163127');
  await page.type('#ctl00_cphScrollMenu_txtLogin', '1070093478');
  await page.type('#ctl00_cphScrollMenu_txtPassword', 'Yzaa3vip@');

  await Promise.all([
    page.click('#ctl00_cphScrollMenu_btnLogin'),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  console.log("✅ Logged in, navigating to vehicle page...");

  const excelBtn = '#ctl00_PlaceHolderRightContent1_VehiclesList1_ctl00_excelExportButton';
  await page.waitForSelector(excelBtn);
  const downloadPath = '/mnt/data';
  await page._client().send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath,
  });

  await page.click(excelBtn);
  console.log("✅ File downloaded to:", downloadPath);

  await browser.close();
})();
