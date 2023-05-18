import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown/MultiSelectDropdown";

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleMultiSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const handleSingleSelectChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h2>Multi-Select Example</h2>
      <MultiSelectDropdown
        options={["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"]}
        selectedOptions={selectedOptions}
        onChange={handleMultiSelectChange}
        label={"Tag"}
        multiSelect
      />

      <h2>Single-Select Example</h2>
      <MultiSelectDropdown
        options={["Twenty", "Twenty one", "Twenty one and a half"]}
        label={"Age"}
        selectedOptions={[selectedOption]}
        onChange={handleSingleSelectChange}
      />
    </div>
  );
};

export default App;
