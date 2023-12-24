export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateFirstName = (firstName) => {
  return firstName.match(/^[a-z ,.'-]+$/i);
};

export const validatePhoneNumber = (phoneNumber) => {
  return phoneNumber.match(/^(\+1)?[0-9]{3}[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/);
};
