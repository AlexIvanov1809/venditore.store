import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";

const TextForm = ({ label, name, type, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClass = () => {
    return "form-control" + (error ? " is-invalid" : " is-valid");
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          name={name}
          className={getInputClass()}
          id={name}
          value={value}
          onChange={handleChange}
          placeholder={
            name === "email"
              ? "example@exp.com"
              : name === "phone"
              ? "071XXXXXXX"
              : ""
          }
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && (
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
TextForm.defaultProps = {
  type: "text"
};
TextForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default TextForm;