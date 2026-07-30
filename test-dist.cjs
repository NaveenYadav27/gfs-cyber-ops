const puppeteer = require('puppeteer-core');
const express = require('express');
const app = express();

app.use(express.static('dist'));

const server = app.listen(8080, async () => {
  console.log('Server started on 8080');
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: "new",
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:8080');
    
    // Type in credentials
    await page.type('input[type="text"]', 'GFS-1234');
    await page.type('input[type="password"]', 'password');
    
    // Click submit
    await page.click('button[type="submit"]');
    
    // Wait for a few seconds to let it load the next page
    await new Promise(r => setTimeout(r, 4000));
    
    await browser.close();
  } catch (e) {
    console.error("Puppeteer Error:", e);
  } finally {
    server.close();
  }
});
