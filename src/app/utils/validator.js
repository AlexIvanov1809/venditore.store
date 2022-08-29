export function validator(data, config) {
  const errors = [];
  function validate(validateMethod, data, config) {
    let statusValidation;
    switch (validateMethod) {
      case "isRequired":
        statusValidation = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidation = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalSymbol = /[A-Z]+/g;
        statusValidation = !capitalSymbol.test(data);
        break;
      }
      case "isContainDigit": {
        const containDigit = /\d+/g;
        statusValidation = !containDigit.test(data);
        break;
      }
      case "min": {
        statusValidation = data.length < config.value;
        break;
      }
      default:
        break;
    }
    if (statusValidation) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
