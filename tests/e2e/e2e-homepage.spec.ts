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
        await homePage.assertPageTitle(data.header.title)
        // Verify logo is visible
        await homePage.assertLogoVisible()
        // Verify texts of header menu items
        await homePage.assertTextMenu(
            data.header.menuTuyenSinh,
            data.header.menuChuongTrinh,
            data.header.menuHoTroSV,
            data.header.menuTinTuc
        )
        // Verify FAQ button is visible and have correct text
        await homePage.assertButtonFAQ(data.header.btnHoiDap)
    })
    test("Slider + info section", async() => {
        // Verify slider is visible
        await homePage.assertHeroSlider()
        // Verify title & desc of info cards
        await homePage.assertInfoCards1(
            data.info.card1TitleNum,
            data.info.card1TitleSuffix,
            data.info.card1Desc1,
            data.info.card1Desc2
        )
        await homePage.assertInfoCards2(
            data.info.card2TitleNum,
            data.info.card2TitleSuffix,
            data.info.card2Desc1,
            data.info.card2Desc2
        )
        await homePage.assertInfoCards3(
            data.info.card3Title,
            data.info.card3Desc
        )
    })
})