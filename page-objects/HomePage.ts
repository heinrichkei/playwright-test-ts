import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    // Define page object
    readonly page: Page
    // Init constructor
    constructor(page: Page) {
        this.page = page
    }
    // Define elements
    elements = {
        imgLogo: () => this.page.locator('img.logo-img.site-logo-img'),
        menuTuyenSinh: () => this.page.locator("li[id='menu-item-5291'] a[class=' main-menu-link main-menu-link-top']"),
        menuChuongTrinh: () => this.page.locator("li[id='menu-item-5863'] a[class=' main-menu-link main-menu-link-top']"),
        menuHoTroSV: () => this.page.locator("li[id='menu-item-7947'] a[class=' main-menu-link main-menu-link-top']"),
        menuTinTuc: () => this.page.locator("li[id='menu-item-6407'] a[class=' main-menu-link main-menu-link-top']"),
        btnHoiDap: () => this.page.locator('#ctabutton'),
        sliderHero: () => this.page.locator('#rev_slider_53_1'),
        infoCard1Title: () => this.page.locator('(//div[@id="eluid8a60b29e"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div'),
        infoCard1Desc: () => this.page.locator('//div[@id="eluid8a60b29e"]//span[1]'),
        infoCard2Title: () => this.page.locator('(//div[@id="eluid69322cbf"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div'),
        infoCard2Desc: () => this.page.locator('//div[@id="eluid69322cbf"]//span[1]'),
        infoCard3Title: () => this.page.locator('(//div[@id="eluidc68c0e7a"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div'),
        infoCard3Desc: () => this.page.locator('//div[@id="eluidc68c0e7a"]//span[1]')
    }
    // Define page methods
    async visit() {
        await this.page.goto("https://fle.ulis.vnu.edu.vn/")
    }
    async assertPageTitle(title: string) {
        await expect(this.page).toHaveTitle(title) 
    }
    async assertLogoVisible() {
        await expect(this.elements.imgLogo()).toBeVisible()
    }
    async assertTextMenu(
        textTuyenSinh: string,
        textChuongTrinh: string,
        textHoTroSV: string,
        textTinTuc: string) {
        await expect(this.elements.menuTuyenSinh()).toContainText(textTuyenSinh)
        await expect(this.elements.menuChuongTrinh()).toContainText(textChuongTrinh)
        await expect(this.elements.menuHoTroSV()).toContainText(textHoTroSV)
        await expect(this.elements.menuTinTuc()).toContainText(textTinTuc)
    }
    async assertButtonFAQ(textFAQ: string) {
        await expect(this.elements.btnHoiDap()).toBeVisible()
        await expect(this.elements.btnHoiDap()).toContainText(textFAQ)
    }
    async assertHeroSlider() {
        await expect(this.elements.sliderHero()).toBeVisible()
    }
    async assertInfoCards1(
        textInfoCard1TitleNum: string,
        textInfoCard1TitleSuffix: string,
        textInfoCard1Desc1: string,
        textInfoCard1Desc2: string,
    ) {
        await expect(this.elements.infoCard1Title()).toContainText(textInfoCard1TitleNum)
        await expect(this.elements.infoCard1Title()).toHaveAttribute('data-text-after', textInfoCard1TitleSuffix)
        await expect(this.elements.infoCard1Desc()).toContainText(textInfoCard1Desc1 + textInfoCard1Desc2)
    }
    async assertInfoCards2(
        textInfoCard2TitleNum: string,
        textInfoCard2TitleSuffix: string,
        textInfoCard2Desc1: string,
        textInfoCard2Desc2: string,
    ) {
        await expect(this.elements.infoCard2Title()).toContainText(textInfoCard2TitleNum)
        await expect(this.elements.infoCard2Title()).toHaveAttribute('data-text-after', textInfoCard2TitleSuffix)
        await expect(this.elements.infoCard2Desc()).toContainText(textInfoCard2Desc1 + textInfoCard2Desc2)
    }
    async assertInfoCards3(
        textInfoCard3Title: string,
        textInfoCard3Desc: string
    ) {
        await expect(this.elements.infoCard3Title()).toContainText(textInfoCard3Title)
        await expect(this.elements.infoCard3Desc()).toContainText(textInfoCard3Desc)
    }
}