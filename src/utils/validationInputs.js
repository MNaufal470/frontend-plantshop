export const formReducer = (state, action) => {
  if (action.type === "notEmpty") {
    if (action.category && state.value === "Choose Category") {
      return {
        value: action.val,
        errors: "This field is required",
        isValid: false,
      };
    }
    if (action.val.trim() === "") {
      return {
        value: action.val,
        errors: "This field is required",
        isValid: false,
      };
    } else {
      return {
        value: action.val,
        isValid: true,
      };
    }
  }

  if (action.type === "userNameExist") {
    return {
      value: state.value,
      errors: "Username already exist!",
      isValid: false,
    };
  }
  if (action.type === "passwordMacthed") {
    if (action.val === "") {
      return {
        value: action.val,
        errors: "This field is required",
        isValid: false,
      };
    }
    if (action.val !== action.password) {
      return {
        value: action.val,
        errors: "Password must match!",
        isValid: false,
      };
    } else {
      return {
        value: action.val,
        isValid: true,
        errors: "",
      };
    }
  }

  if (action.type === "email") {
    if (action.val === "") {
      return {
        value: action.val,
        errors: "This field is required",
        isValid: false,
      };
    }
    if (!action.val.includes("@")) {
      return {
        value: action.val,
        errors: "Please input a valid email",
        isValid: false,
      };
    } else {
      return {
        value: action.val,
        errors: "",
        isValid: true,
      };
    }
  }
  if (action.type === "emailAlreadyExist") {
    return {
      value: state.value,
      errors: "Email already exist!",
      isValid: false,
    };
  }
  if (action.type === "inccorectPassword") {
    return { value: state.value, errors: action.val, isValid: false };
  }
  if (action.type === "invalidUser") {
    return { value: state.value, errors: action.val, isValid: false };
  }
  if (action.type === "uploadImage") {
    if (action.val.length > 3) {
      return {
        value: state.value,
        errors: "Max image upload(3)",
        isValid: state.value.length > 0,
      };
    }

    if (action.required === true && action.val.length === 0) {
      return {
        value: state.value,
        errors: "Upload image required",
        isValid: false,
      };
    }
    if (!action.mime.match(/\(jpg|jpeg|png/)) {
      return {
        value: state.value,
        errors: "Incorect image type (should be jpg,jpeg or png)",
        isValid: false,
      };
    } else if (action.size > 1048576) {
      return {
        value: state.value,
        errors: "Size too large (above 1 MB)",
        isValid: false,
      };
    } else if (action.multiple) {
      let imageTable = [...state.value];
      [...Object(action.val)].map((item, i) => imageTable.push(item));
      return {
        value: imageTable,
        isValid: true,
        errors: "",
      };
    } else {
      return { value: action.val, isValid: true, errors: "" };
    }
  }

  if (action.type === "fillData") {
    if (action.val === "") {
      return { value: action.val, isValid: "", errors: state.errros };
    }
    return { value: action.val, isValid: true, errors: state.errros };
  }

  if (action.type === "errors") {
    return { value: state.value, isValid: false, errors: action.errorMessage };
  }
};
