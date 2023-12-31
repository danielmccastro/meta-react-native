import { useRef, useEffect } from "react";

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

export function getSectionListData(data) {
  let map = new Map();
  data.forEach((element, index) => {
    let dt = map.get(element.category);
    let { id, name, price, description, image } = element;
    if (id === undefined) {id = index}
    if (dt) {
      dt.push({ id, name, price, description, image });
      map.set(element.category, dt);
    } else {
      map.set(element.category, [{ id, name, price, description, image }]);
    }
  });
  let arr = Array.from(map.keys()).map((element) => ({
    name: element,
    data: map.get(element),
  }));
  console.log(arr);
  return arr;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
