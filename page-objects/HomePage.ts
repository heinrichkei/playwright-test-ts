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
    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.imgLogo = page.locator('img.logo-img.site-logo-img')
        this.menuTuyenSinh = page.locator("li[id='menu-item-5291'] a[class=' main-menu-link main-menu-link-top']")
        this.menuChuongTrinh = page.locator("li[id='menu-item-5863'] a[class=' main-menu-link main-menu-link-top']")
        this.menuHoTroSV = page.locator("li[id='menu-item-7947'] a[class=' main-menu-link main-menu-link-top']")
        this.menuTinTuc = page.locator("li[id='menu-item-6407'] a[class=' main-menu-link main-menu-link-top']")
        this.btnHoiDap = page.locator('#ctabutton')
    }
    // Define page methods
    async visit() {
        await this.page.goto("https://fle.ulis.vnu.edu.vn/")
    }
    async assertPageTitle() {
        await expect(this.page).toHaveTitle("FLE ULIS - Khoa Đào tạo & Bồi dưỡng Ngoại ngữ - Trường ĐH Ngoại ngữ - ĐHQGHN") 
    }
    async assertLogoVisible() {
        await expect(this.imgLogo).toBeVisible()
    }
    async assertTextMenu() {
        await expect(this.menuTuyenSinh).toContainText('Tuyển sinh')
        await expect(this.menuChuongTrinh).toContainText('Chương trình')
        await expect(this.menuHoTroSV).toContainText('Hỗ trợ sinh viên')
        await expect(this.menuTinTuc).toContainText('Tin tức')
    }
    async assertButtonFAQ() {
        await expect(this.btnHoiDap).toBeVisible()
        await expect(this.btnHoiDap).toContainText('HỎI ĐÁP')
    }
}