import { Injectable } from '@nestjs/common';
import { CreateReleaseSswDto } from './dto/create-release-ssw.dto';
import { UpdateReleaseSswDto } from './dto/update-release-ssw.dto';
import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
@Injectable()
export class ReleaseSswService {
  create(createReleaseSswDto: CreateReleaseSswDto) {
    return 'This action adds a new releaseSsw';
  }

  findAll() {
    return `This action returns all releaseSsw`;
  }

  findOne(id: number) {
    return `This action returns a #${id} releaseSsw`;
  }

  update(id: number, updateReleaseSswDto: UpdateReleaseSswDto) {
    return `This action updates a #${id} releaseSsw`;
  }

  remove(id: number) {
    return `This action removes a #${id} releaseSsw`;
  }

  async createRelease(body: any): Promise<any> {

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const { releases } = body;

    for (const release of releases) {

      //create build of chrome 
      let driver = await new Builder().forBrowser(Browser.CHROME).build();

      // initialize ssw
      await delay(1000);
      await driver.get("https://sistema.ssw.inf.br/bin/ssw0422");

      //create a new session         
      await driver.findElement(By.id("1")).clear();
      await driver.findElement(By.id("1")).sendKeys(process.env.DOMAIN_SSW);

      await driver.findElement(By.id("2")).clear();
      await driver.findElement(By.id("2")).sendKeys(process.env.CPF_SSW);

      await driver.findElement(By.id("3")).clear();
      await driver.findElement(By.id("3")).sendKeys(process.env.USER_SSW);

      await driver.findElement(By.id("4")).clear();
      await driver.findElement(By.id("4")).sendKeys(process.env.PASSWORD_SSW);

      await delay(1000);
      await driver.findElement(By.id("5")).click();

      // set option to 475
      await delay(1000);
      await driver.get("https://sistema.ssw.inf.br/bin/ssw0094 ");

      // set event to create a new release.
      await delay(1000);
      await driver.findElement(By.id("3")).clear();
      await driver.findElement(By.id("3")).sendKeys("ATR");
      await driver.findElement(By.id("5")).sendKeys("3602");

      // Check main page
      const ssw0094 = await driver.getWindowHandle();
      await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10000);

      // Check all pages
      await delay(1000);
      const windows = await driver.getAllWindowHandles();

      let ssw0094_content: any

      //switch to page if different from main page
      await delay(1000);
      windows.forEach(async (handle) => {
        if (handle !== ssw0094) {
          ssw0094_content = handle;
          await driver.switchTo().window(handle);
        }
      });

      //check page title to continue
      await delay(1000);
      await driver.wait(until.titleIs("475 - Programação de Despesas :: SSW Sistema de Transportes"), 10000);

      //close modal 
      await delay(1000);
      await driver.findElement(By.id("0")).click();

      // verify and send data to create a new release
      await delay(1000);
      if (!release.providerDocument) {
        await driver.quit();
        return { error: true, message: "Please inform providerDocument", release: release }
      };
      await driver.findElement(By.id("2")).clear();
      await driver.findElement(By.id("2")).sendKeys(`${release.providerDocument}`);

      await delay(1000);
      if (!release.documentSeries) {
        await driver.quit();
        return { error: true, message: "Please inform documentSeries", release: release }
      };
      await driver.findElement(By.id("4")).clear();
      await driver.findElement(By.id("4")).sendKeys(`${release.documentSeries}`);

      await delay(1000);
      if (!release.documentNumber) {
        await driver.quit();
        return { error: true, message: "Please inform documentNumber", release: release }
      };
      await driver.findElement(By.id("5")).clear();
      await driver.findElement(By.id("5")).sendKeys(`${release.documentNumber}`);

      await delay(1000);
      if (!release.documentModel) {
        await driver.quit();
        return { error: true, message: "Please inform documentModel", release: release }
      };
      await driver.findElement(By.id("7")).clear();
      await driver.findElement(By.id("7")).sendKeys(`${release.documentModel}`);

      await delay(1000);
      if (!release.documentIssueDate) {
        await driver.quit();
        return { error: true, message: "Please inform documentIssueDate", release: release }
      };
      await driver.findElement(By.id("16")).clear();
      await driver.findElement(By.id("16")).sendKeys(this.formatDate(release.documentIssueDate));

      await delay(1000);
      if (!release.documentValue) {
        await driver.quit();
        return { error: true, message: "Please inform documentValue", release: release }
      };
      await driver.findElement(By.id("15")).clear();
      await driver.findElement(By.id("15")).sendKeys(`${release.documentValue}`);

      await delay(1000);
      if (!release.paymentDueDate) {
        await driver.quit();
        return { error: true, message: "Please inform paymentDueDate", release: release }
      };
      await driver.findElement(By.id("34")).clear();
      await driver.findElement(By.id("34")).sendKeys(this.formatDate(release.paymentDueDate));

      await delay(1000);
      if (!release.paymentHistory) {
        await driver.quit();
        return { error: true, message: "Please inform paymentHistory", release: release }
      };
      await driver.findElement(By.id("40")).clear();
      await driver.findElement(By.id("40")).sendKeys(`${release.paymentHistory}`);

      await delay(1000);
      await driver.findElement(By.id("47")).click();

      let alert_content = '';

      try {
        await delay(1000);
        alert_content = await driver.findElement(By.id("errormsglabel")).getText();
      } catch { }

      const message_success = alert_content.includes('sucesso')
      console.log(message_success);

      await driver.quit();

      if (!message_success) return { error: true, message: alert_content, release: release };

      return { success: true, message: alert_content, release: release };

    }

  }

  private formatDate(date_to_formate: any): string {

    const date = new Date(date_to_formate).toLocaleDateString().replace(`${new Date().getFullYear()}`, new Date().getFullYear().toString().slice(2))

    return date;
  }

}
