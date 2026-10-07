import { test, expect } from "@playwright/test";

test.describe("vault collection page", () => {
  test("is reachable from the top nav and footer", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("banner").getByRole("link", { name: "Inventory" }).click();
    await expect(page).toHaveURL(/\/inventory$/);

    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Collection Inventory" }).click();
    await expect(page).toHaveURL(/\/inventory$/);
  });

  test("shows 12 cars on the first page and paginates", async ({ page }) => {
    await page.goto("/inventory");

    const cards = page.locator("#vault-results article");
    await expect(cards).toHaveCount(12);

    await page.getByRole("button", { name: "Page 2" }).click();
    await expect(page.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    await expect(cards).toHaveCount(12);

    await page.getByRole("button", { name: "Page 3" }).click();
    await expect(page.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    await expect(cards).toHaveCount(12);
  });

  test("financing calculator sits under the filters and reacts to its sliders", async ({ page }) => {
    await page.goto("/inventory");

    const calc = page.getByRole("region", { name: "Financing Calculator" });
    await expect(calc).toBeVisible();
    await expect(calc.getByText(/\$2,93\d/).first()).toBeVisible();

    await calc.getByLabel("Interest Rate (APR)").fill("0");
    await calc.getByRole("button", { name: "60" }).click();
    await expect(calc.getByText("$2,500").first()).toBeVisible(); // $150,000 / 60 months

    const searchBox = await page.getByRole("complementary").locator("form").boundingBox();
    const calcBox = await calc.boundingBox();
    expect(calcBox!.y).toBeGreaterThan(searchBox!.y + searchBox!.height - 1);
  });

  test("filters by condition and location", async ({ page }) => {
    await page.goto("/inventory");

    const cards = page.locator("#vault-results article");
    const search = page.getByRole("form", { name: "Advanced search" });

    await search.getByLabel("Project").check();
    await expect(cards).toHaveCount(4);

    await search.getByLabel("London").check();
    await expect(cards).toHaveCount(3); // Project cars in London: XK150 S, E-Type 3.8 Coupe, Sprite

    await page.getByRole("button", { name: "Reset Filters" }).click();
    await search.getByLabel("Tokyo").check();
    await expect(cards).toHaveCount(12);
  });

  test("advanced search filters the grid and resets", async ({ page }) => {
    await page.goto("/inventory");

    await page.getByLabel("Ferrari").check();
    const cards = page.locator("#vault-results article");
    await expect(cards).toHaveCount(4);
    await expect(page.getByRole("navigation", { name: "Pagination" })).toHaveCount(0);

    await page.getByRole("button", { name: "Reset Filters" }).click();
    await expect(cards).toHaveCount(12);
  });
});
