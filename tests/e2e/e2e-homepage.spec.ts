import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import * as data from '../../data/homePage-data.json'

test.describe("Homepage", () => {
    let homePage: HomePage
    // Before Hook
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        await homePage.visit()
        // await page.goto('https://fle.ulis.vnu.edu.vn/')
    })
    // Homepage name + header
    test("Page name + Header", async () => {
        // Expect to have title
        await homePage.assertPageTitle(data.title)
        // Verify logo is visible
        await homePage.assertLogoVisible()
        // Verify texts of header menu items
        await homePage.assertTextMenu(
            data.menuTuyenSinh,
            data.menuChuongTrinh,
            data.menuHoTroSV,
            data.menuTinTuc
        )
        // Verify FAQ button is visible and have correct text
        await homePage.assertButtonFAQ(data.btnHoiDap)
    })
    test("Slider + info section", async() => {
        // Verify slider is visible
        await homePage.assertHeroSlider()
    })
})