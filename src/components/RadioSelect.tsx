import { ComponentProps, For, splitProps } from "solid-js";

export interface RadioSelectProps<K>
  extends Omit<ComponentProps<"fieldset">, "onInput"> {
  options: K[];
  name: string;
  label: string;
  optionLabel: (value: K) => string;
  value?: K;
  onInput?: (value: K) => void;
}

const RadioSelect = <K extends string>(props: RadioSelectProps<K>) => {
  const [local, fieldset] = splitProps(props, [
    "options",
    "name",
    "label",
    "optionLabel",
    "value",
    "onInput",
  ]);

  return (
    <fieldset {...fieldset}>
      <legend>{local.label}</legend>

      <For each={local.options}>
        {(option) => (
          <label>
            <input
              type="radio"
              name={local.name}
              value={option}
              checked={local.value === option}
              onInput={() => local.onInput?.(option)}
            />
            <span>{local.optionLabel(option)}</span>
          </label>
        )}
      </For>
    </fieldset>
  );
};

export default RadioSelect;
