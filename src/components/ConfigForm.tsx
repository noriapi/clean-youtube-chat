import { Component, createResource, Show } from "solid-js";

import * as C from "~/lib/config";

import ConfigFormInput from "./ConfigFormInput";

const ConfigForm: Component<{ defaultValue: C.Config }> = (props) => {
  const [storageConfig] = createResource(() =>
    C.loadConfig(props.defaultValue),
  );

  return (
    <Show when={storageConfig()} keyed>
      {(c) => {
        const [config, setConfig] = C.createConfigStore(c);

        return <ConfigFormInput value={config} setValue={setConfig} />;
      }}
    </Show>
  );
};

export default ConfigForm;
