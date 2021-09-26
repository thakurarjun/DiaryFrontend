import  { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState("false");
  const showLoginButton = { display: visible ? "none" : "" };
  const hideLoginForm = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div style={showLoginButton}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={hideLoginForm}>
          {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};
export default Togglable;
