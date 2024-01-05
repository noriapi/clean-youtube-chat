import { Component, createResource, Show, untrack } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

import * as C from "~/lib/config";

import ConfigFormInput from "./ConfigFormInput";

const ConfigForm: Component<{ defaultValue: C.Config }> = (props) => {
  const [storageConfig] = createResource(() =>
    C.loadConfig(props.defaultValue),
  );

  return (
    <Show when={storageConfig()} keyed>
      {(c) => {
        const [config, setStoreConfig] = createStore<C.Config>(c);

        const setConfig: SetStoreFunction<C.Config> = (...args: any[]) => {
          // @ts-expect-error: just passing arguments
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setStoreConfig(...args);
          const value = untrack(() => config);
          void C.saveConfig(value);
        };

        return <ConfigFormInput value={config} setValue={setConfig} />;
      }}
    </Show>
  );
};

export default ConfigForm;
