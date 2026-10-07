import { test, expect } from "@playwright/test";

test.describe("services & acquisitions (on the About page)", () => {
  test("is no longer on the homepage", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#consignment")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Direct Buyer-to-Seller/ })).toHaveCount(0);
  });

  test("financing calculator computes the default payment and updates live", async ({ page }) => {
    await page.goto("/about");

    const panel = page.getByRole("tabpanel", { name: "Financing Calculator" });
    await expect(panel.getByText(/\$2,93\d/).first()).toBeVisible();
    await expect(panel.getByText("$150,000")).toBeVisible();

    await panel.getByLabel("Down Payment ($)").fill("185000");
    await expect(panel.getByText("$0 / mo")).toBeVisible();
  });

  test("tabs switch between the calculator and the consignment form", async ({ page }) => {
    await page.goto("/about");

    await page.getByRole("tab", { name: "Sell / Consign Your Car" }).click();
    await expect(page.getByRole("heading", { name: /Consign or Sell Your Classic/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit Vehicle for Review" })).toBeVisible();
    await expect(page.getByLabel("Vehicle Value ($)")).toBeHidden();

    await page.getByRole("tab", { name: "Financing Calculator" }).click();
    await expect(page.getByLabel("Vehicle Value ($)")).toBeVisible();
  });

  test("the homepage Submit Your Car button opens the consign tab on the About page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Submit Your Car for Review" }).click();
    await expect(page).toHaveURL(/\/about#sell$/);
    await expect(page.getByRole("tab", { name: "Sell / Consign Your Car" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("the About page shows the direct-sale callout, how it works and plans", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: /Direct Buyer-to-Seller Marketplace/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How It Works" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Flexible Publishing Plans" })).toBeVisible();
  });
});
