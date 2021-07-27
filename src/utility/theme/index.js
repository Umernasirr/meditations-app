import { extendTheme } from "@chakra-ui/react";

export const Colors = {
  brand: {
    100: "#FFDCE2",
    200: "#C9B8D9",
    400: "#C1C3F3",
    600: "#7586DB",
    800: "#6269A0",
  },
};

export const theme = extendTheme({
  colors: Colors,
});
