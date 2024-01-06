import { expect, test } from "./fixtures";
import { PopupPage } from "./pages/popup";

test("should persist config", async ({ page, extensionId }) => {
  const popup = new PopupPage(page, extensionId);

  await popup.goto();

  await expect(popup.messageOwnerHide).toBeChecked({ checked: false });

  await popup.messageOwnerHide.click();

  await popup.page.reload();

  await expect(popup.messageOwnerHide).toBeChecked({ checked: true });
});
