import "./App.css";

import { Component } from "solid-js";

import ConfigForm from "~/components/ConfigForm";
import WysiwygConfigInput from "~/components/WysiwygConfigInput";
import { CONFIG_DEFAULT } from "~/lib/config";

const App: Component = () => {
  // return <ConfigForm defaultValue={CONFIG_DEFAULT} />;
  return <WysiwygConfigInput />;
};

export default App;
