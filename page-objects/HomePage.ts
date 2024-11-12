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
}