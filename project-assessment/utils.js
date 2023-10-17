import { useRef, useEffect } from "react";

export const SECTION_LIST_MOCK_DATA = [
  {
    title: "Appetizers",
    data: [
      {
        id: "1",
        title: "Pasta",
        price: "10",
      },
      {
        id: "3",
        title: "Pizza",
        price: "8",
      },
    ],
  },
  {
    title: "Salads",
    data: [
      {
        id: "2",
        title: "Caesar",
        price: "2",
      },
      {
        id: "4",
        title: "Greek",
        price: "3",
      },
    ],
  },
];

export function getSectionListData(data) {
  let map = new Map();
  data.forEach((element) => {
    let dt = map.get(element.category);
    let { id, title, price } = element;
    if (dt) {
      dt.push({ id, title, price });
      map.set(element.category, dt);
    } else {
      map.set(element.category, [{ id, title, price }]);
    }
  });
  let arr = Array.from(map.keys()).map((element) => ({
    title: element,
    data: map.get(element),
  }));
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
