import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green",
};

export const mappingColors = {
  primary : '#e14eca',
  blue : '#1d8cf8',
  green : '#2dce89'
}

export const classMappingColors = {
  primary : 'primary',
  blue : 'info',
  green : 'success'
}

export const BackgroundColorContext = createContext({
  color: backgroundColors.blue,
  changeColor: (color) => {},
});
