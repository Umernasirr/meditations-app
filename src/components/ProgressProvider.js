import React from "react";

// If you don't have a version of React that supports
// hooks, you can use a class-based version of this
// component in ProgressProviderUsingClass.js
const ProgressProvider = ({
  valueStart,
  valueEnd,
  children,
  negative,
  onCompleteHandler,
}) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    console.log("negative", negative);

    if (valueStart + negative === 0) {
      onCompleteHandler();
    }
    if (valueStart + negative >= valueEnd) {
      setValue(valueStart + negative);
    } else {
      setValue(valueStart);
    }
  }, [valueEnd, negative]);

  return children(value);
};
export default ProgressProvider;
