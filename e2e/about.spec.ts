import { test, expect } from "@playwright/test";

test("about page is reachable from the footer and shows the core sections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "About Us" }).click();

  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("love the classics");
  await expect(page.getByRole("heading", { name: "What we stand for" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse the Vault" })).toBeVisible();
});
