import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    // Define selectors
    readonly page: Page
    readonly imgLogo: Locator
    readonly menuTuyenSinh: Locator
    readonly menuChuongTrinh: Locator
    readonly menuHoTroSV: Locator
    readonly menuTinTuc: Locator
    readonly btnHoiDap: Locator
    readonly sliderHero: Locator
    readonly infoCard1Title: Locator
    readonly infoCard1Desc: Locator
    readonly infoCard2Title: Locator
    readonly infoCard2Desc: Locator
    readonly infoCard3Title: Locator
    readonly infoCard3Desc: Locator
    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.imgLogo = page.locator('img.logo-img.site-logo-img')
        this.menuTuyenSinh = page.locator("li[id='menu-item-5291'] a[class=' main-menu-link main-menu-link-top']")
        this.menuChuongTrinh = page.locator("li[id='menu-item-5863'] a[class=' main-menu-link main-menu-link-top']")
        this.menuHoTroSV = page.locator("li[id='menu-item-7947'] a[class=' main-menu-link main-menu-link-top']")
        this.menuTinTuc = page.locator("li[id='menu-item-6407'] a[class=' main-menu-link main-menu-link-top']")
        this.btnHoiDap = page.locator('#ctabutton')
        this.sliderHero = page.locator('#rev_slider_53_1')
        this.infoCard1Title = page.locator('(//div[@id="eluid8a60b29e"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div')
        this.infoCard1Desc = page.locator('//div[@id="eluid8a60b29e"]//span[1]')
        this.infoCard2Title = page.locator('(//div[@id="eluid69322cbf"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div')
        this.infoCard2Desc = page.locator('//div[@id="eluid69322cbf"]//span[1]')
        this.infoCard3Title = page.locator('(//div[@id="eluidc68c0e7a"]/descendant::div[@class="znColumnElement-innerContent"])[2]/descendant::div')
        this.infoCard3Desc = page.locator('//div[@id="eluidc68c0e7a"]//span[1]')
    }
    // Define page methods
    async visit() {
        await this.page.goto("https://fle.ulis.vnu.edu.vn/")
    }
    async assertPageTitle(title: string) {
        await expect(this.page).toHaveTitle(title) 
    }
    async assertLogoVisible() {
        await expect(this.imgLogo).toBeVisible()
    }
    async assertTextMenu(
        textTuyenSinh: string,
        textChuongTrinh: string,
        textHoTroSV: string,
        textTinTuc: string) {
        await expect(this.menuTuyenSinh).toContainText(textTuyenSinh)
        await expect(this.menuChuongTrinh).toContainText(textChuongTrinh)
        await expect(this.menuHoTroSV).toContainText(textHoTroSV)
        await expect(this.menuTinTuc).toContainText(textTinTuc)
    }
    async assertButtonFAQ(textFAQ: string) {
        await expect(this.btnHoiDap).toBeVisible()
        await expect(this.btnHoiDap).toContainText(textFAQ)
    }
    async assertHeroSlider() {
        await expect(this.sliderHero).toBeVisible()
    }
    async assertInfoCards1(
        textInfoCard1TitleNum: string,
        textInfoCard1TitleSuffix: string,
        textInfoCard1Desc1: string,
        textInfoCard1Desc2: string,
    ) {
        await expect(this.infoCard1Title).toContainText(textInfoCard1TitleNum)
        await expect(this.infoCard1Title).toHaveAttribute('data-text-after', textInfoCard1TitleSuffix)
        await expect(this.infoCard1Desc).toContainText(textInfoCard1Desc1 + textInfoCard1Desc2)
    }
    async assertInfoCards2(
        textInfoCard2TitleNum: string,
        textInfoCard2TitleSuffix: string,
        textInfoCard2Desc1: string,
        textInfoCard2Desc2: string,
    ) {
        await expect(this.infoCard2Title).toContainText(textInfoCard2TitleNum)
        await expect(this.infoCard2Title).toHaveAttribute('data-text-after', textInfoCard2TitleSuffix)
        await expect(this.infoCard2Desc).toContainText(textInfoCard2Desc1 + textInfoCard2Desc2)
    }
    async assertInfoCards3(
        textInfoCard3Title: string,
        textInfoCard3Desc: string
    ) {
        await expect(this.infoCard3Title).toContainText(textInfoCard3Title)
        await expect(this.infoCard3Desc).toContainText(textInfoCard3Desc)
    }
}