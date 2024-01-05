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
        <legend>{browser.i18n.getMessage("configFormMessage")}</legend>

        <RadioSelect
          name="message-owner"
          label={browser.i18n.getMessage("configFormOwner")}
          options={["hide", "show", "nohighlight"]}
          optionLabel={getOptionLabel}
          value={local.value.message.owner}
          onInput={(value) => local.setValue("message", "owner", value)}
        />

        <RadioSelect
          name="message-moderator"
          label={browser.i18n.getMessage("configFormModerator")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.message.moderator}
          onInput={(value) => local.setValue("message", "moderator", value)}
        />

        <RadioSelect
          name="message-others"
          label={browser.i18n.getMessage("configFormOthers")}
          options={["hide", "show"]}
          optionLabel={getOptionLabel}
          value={local.value.message.others}
          onInput={(value) => local.setValue("message", "others", value)}
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
        value={local.value.superchat}
        onInput={(value) => local.setValue("superchat", value)}
      />

      <RadioSelect
        name="sticker"
        label={browser.i18n.getMessage("configFormSticker")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.sticker}
        onInput={(value) => local.setValue("sticker", value)}
      />

      <RadioSelect
        name="superchatBar"
        label={browser.i18n.getMessage("configFormSuperchatBar")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.superchatBar}
        onInput={(value) => local.setValue("superchatBar", value)}
      />

      <RadioSelect
        name="memberChat"
        label={browser.i18n.getMessage("configFormMemberChat")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.memberChat}
        onInput={(value) => local.setValue("memberChat", value)}
      />

      <RadioSelect
        name="engagement"
        label={browser.i18n.getMessage("configFormEngagement")}
        options={["hide", "show"]}
        optionLabel={getOptionLabel}
        value={local.value.engagement}
        onInput={(value) => local.setValue("engagement", value)}
      />
    </fieldset>
  );
};

export default ConfigFormInput;
