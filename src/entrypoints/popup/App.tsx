import "./App.css";

import { Component } from "solid-js";

import ConfigForm from "~/components/ConfigForm";
import { CONFIG_DEFAULT } from "~/lib/config";

const App: Component = () => {
  return <ConfigForm defaultValue={CONFIG_DEFAULT} />;
};

export default App;
