import { type Locator, type Page } from "@playwright/test";

export class PopupPage {
  readonly message: Locator;
  readonly messageOwner: Locator;
  readonly messageOwnerHide: Locator;
  readonly messageOwnerShow: Locator;
  readonly messageOwnerNohighlight: Locator;

  constructor(
    public readonly page: Page,
    public readonly extensionId: string,
  ) {
    this.message = this.page.getByRole("group", { name: "Message" });
    this.messageOwner = this.message.getByRole("group", { name: "Owner" });
    this.messageOwnerHide = this.messageOwner.getByRole("radio", {
      name: "Hide",
    });
    this.messageOwnerShow = this.messageOwner.getByRole("radio", {
      name: "Show",
    });
    this.messageOwnerNohighlight = this.messageOwner.getByRole("radio", {
      name: "No highlight",
    });
  }

  async goto() {
    await this.page.goto(`chrome-extension://${this.extensionId}/popup.html`);
  }
}
