import { test, expect } from "@playwright/test";

test("as a user i select a broker", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveTitle("Quotation - Edit");

  const combobox = await page.getByRole("combobox");
  await combobox.click();
  await combobox.press("ArrowDown");
  await combobox.press("Enter");

  await expect(page.getByText("37 George Street, Sydney")).toBeVisible();
  await expect(page.getByText("Australia")).toBeVisible();
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page).toHaveTitle("Quotation - Edit");

  const combobox = await page.getByRole("combobox");
  await combobox.click();

  const addManually = await page.getByRole("button", { name: "Add manually" });
  await addManually.click();

  const modalDialog = await page.getByRole("dialog");
  await expect(modalDialog.getByText("Add manually")).toBeVisible();

  await modalDialog.getByLabel("Legal name").fill("Company Name");
  await modalDialog.getByLabel("Address").fill("somewhere");
  await modalDialog.getByLabel("City").fill("Paris");
  await modalDialog.getByLabel("Country").fill("France");
  await modalDialog.getByRole("button", { name: "save" }).click();

  await expect(page.getByText("somewhere")).toBeVisible();
  await expect(page.getByText("France")).toBeVisible();
});
