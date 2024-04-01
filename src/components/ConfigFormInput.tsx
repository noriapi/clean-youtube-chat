import { Component, ComponentProps, splitProps } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";
import { browser } from "wxt/browser";

import { Config } from "~/lib/config";

import RadioSelect from "./RadioSelect";

const getOptionLabel = (option: "hide" | "nohighlight" | "show") => {
  switch (option) {
    case "hide":
      return browser.i18n.getMessage("configFormHide");
    case "nohighlight":
      return browser.i18n.getMessage("configFormNoHighlight");
    case "show":
      return browser.i18n.getMessage("configFormShow");
  }
};

const ConfigFormInput: Component<
  {
    value: Store<Config>;
    setValue: SetStoreFunction<Config>;
  } & ComponentProps<"fieldset">
> = (props) => {
  const [local, fieldset] = splitProps(props, ["value", "setValue"]);

  return (
    <fieldset {...fieldset}>
      <legend>{browser.i18n.getMessage("configFormTitle")}</legend>

      <fieldset>
        <legend>{browser.i18n.getMessage("configFormChat")}</legend>

        <RadioSelect
          name="message-owner"
          label={browser.i18n.getMessage("configFormOwner")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.chat.owner}
          onInput={(value) => local.setValue("chat", "owner", value)}
        />

        <RadioSelect
          name="message-moderator"
          label={browser.i18n.getMessage("configFormModerator")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.chat.moderator}
          onInput={(value) => local.setValue("chat", "moderator", value)}
        />

        <RadioSelect
          name="message-member"
          label={browser.i18n.getMessage("configFormMember")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.chat.member}
          onInput={(value) => local.setValue("chat", "member", value)}
        />

        <RadioSelect
          name="message-others"
          label={browser.i18n.getMessage("configFormOthers")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.chat.others}
          onInput={(value) => local.setValue("chat", "others", value)}
        />
      </fieldset>

      <fieldset>
        <legend>{browser.i18n.getMessage("configFormName")}</legend>

        <RadioSelect
          name="name-owner"
          label={browser.i18n.getMessage("configFormOwner")}
          options={["hide", "show", "nohighlight"]}
          optionLabel={getOptionLabel}
          value={local.value.name.owner}
          onInput={(value) => local.setValue("name", "owner", value)}
        />

        <RadioSelect
          name="name-moderator"
          label={browser.i18n.getMessage("configFormModerator")}
          options={["hide", "show", "nohighlight"]}
          optionLabel={getOptionLabel}
          value={local.value.name.moderator}
          onInput={(value) => local.setValue("name", "moderator", value)}
        />

        <RadioSelect
          name="name-member"
          label={browser.i18n.getMessage("configFormMember")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.name.member}
          onInput={(value) => local.setValue("name", "member", value)}
        />

        <RadioSelect
          name="name-others"
          label={browser.i18n.getMessage("configFormOthers")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.name.others}
          onInput={(value) => local.setValue("name", "others", value)}
        />
      </fieldset>

      <fieldset>
        <legend>{browser.i18n.getMessage("configFormIcon")}</legend>

        <RadioSelect
          name="icon-owner"
          label={browser.i18n.getMessage("configFormOwner")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.icon.owner}
          onInput={(value) => local.setValue("icon", "owner", value)}
        />

        <RadioSelect
          name="icon-moderator"
          label={browser.i18n.getMessage("configFormModerator")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.icon.moderator}
          onInput={(value) => local.setValue("icon", "moderator", value)}
        />

        <RadioSelect
          name="icon-member"
          label={browser.i18n.getMessage("configFormMember")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.icon.member}
          onInput={(value) => local.setValue("icon", "member", value)}
        />

        <RadioSelect
          name="icon-others"
          label={browser.i18n.getMessage("configFormOthers")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.icon.others}
          onInput={(value) => local.setValue("icon", "others", value)}
        />
      </fieldset>

      <fieldset>
        <legend>{browser.i18n.getMessage("configFormBadge")}</legend>
        <RadioSelect
          name="badge-moderator"
          label={browser.i18n.getMessage("configFormModerator")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.badge.moderator}
          onInput={(value) => local.setValue("badge", "moderator", value)}
        />
      </fieldset>

      <RadioSelect
        name="superchat"
        label={browser.i18n.getMessage("configFormSuperchat")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.superchat.any}
        onInput={(value) => local.setValue("superchat", "any", value)}
      />

      <RadioSelect
        name="sticker"
        label={browser.i18n.getMessage("configFormSticker")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.sticker.any}
        onInput={(value) => local.setValue("sticker", "any", value)}
      />

      <RadioSelect
        name="superchatBar"
        label={browser.i18n.getMessage("configFormSuperchatBar")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.superchatBar.any}
        onInput={(value) => local.setValue("superchatBar", "any", value)}
      />

      <RadioSelect
        name="memberChat"
        label={browser.i18n.getMessage("configFormMemberChat")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.memberChat.any}
        onInput={(value) => local.setValue("memberChat", "any", value)}
      />

      <RadioSelect
        name="engagement"
        label={browser.i18n.getMessage("configFormEngagement")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.engagement.any}
        onInput={(value) => local.setValue("engagement", "any", value)}
      />
    </fieldset>
  );
};

export default ConfigFormInput;
