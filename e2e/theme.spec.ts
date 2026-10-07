import { test, expect } from "@playwright/test";

const bodyBg = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme switcher", () => {
  test("defaults to the light theme", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("html")).not.toHaveClass(/dark/);
    expect(await bodyBg(page)).toBe("rgb(248, 248, 246)");
  });

  test("footer toggle switches to dark and persists across reloads", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await footer.getByRole("button", { name: "Dark Mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    expect(await bodyBg(page)).toBe("rgb(13, 13, 13)");

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(footer.getByRole("button", { name: "Dark Mode" })).toHaveAttribute("aria-pressed", "true");

    await footer.getByRole("button", { name: "Light Mode" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    expect(await bodyBg(page)).toBe("rgb(248, 248, 246)");
  });
});
