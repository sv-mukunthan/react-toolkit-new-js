import { useState } from "react";
import { intersection } from "lodash";

export const useSetState = (initialState) => {
  const [state, setData] = useState(initialState);

  const setState = (newState) => {
    setData((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, setState];
};

export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes, roles) {
  return routes.filter(({ permissions }) => {
    if (!permissions) return true;
    else if (!isArrayWithLength(permissions)) return true;
    else return intersection(permissions, roles).length;
  });
}

export const capitalizeFirstLetter = (string) => {
  let name = string.charAt(0).toUpperCase() + string.slice(1);
  return name.replaceAll("_", " ");
};
