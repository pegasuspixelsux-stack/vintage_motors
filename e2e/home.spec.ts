import { test, expect } from "@playwright/test";

test.describe("landing page", () => {
  test("renders the core sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find Your Timeless Classic.");
    await expect(page.locator("#inventory")).toBeVisible();
    await expect(page.locator("#restoration")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("shows twelve automobile cards in the featured grid", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#inventory article")).toHaveCount(12);
  });

  test("search bar sits inside the featured collection and filters cards", async ({ page }) => {
    await page.goto("/");

    const bar = page.locator("#inventory").getByRole("search");
    await expect(bar).toBeVisible();
    await expect(bar.getByLabel("Filter by brand")).toBeVisible();
    await expect(bar.getByLabel("Filter by era")).toBeVisible();
    await expect(bar.getByLabel("Filter by price")).toBeVisible();

    await bar.getByLabel("Filter by brand").selectOption("Ferrari");
    await bar.getByRole("button", { name: "Search" }).click();
    await expect(page.locator("#inventory article")).toHaveCount(2); // 365 GTB/4 and 275 GTB
  });

  test("uses the Instrument Serif font variable for headlines", async ({ page }) => {
    await page.goto("/");

    const family = await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family.toLowerCase()).toContain("instrument serif");
  });

  test("uses square geometry on buttons and cards", async ({ page }) => {
    await page.goto("/");

    const radius = await page
      .getByRole("button", { name: "Search" })
      .evaluate((el) => getComputedStyle(el).borderRadius);
    expect(radius).toBe("0px");
  });
});
