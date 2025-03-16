import { extendTheme } from 'native-base';
import { COLORS } from '@global';

export const ThemeConfig = extendTheme({
  components: {
    Text: {
      baseStyle: () => {
        return {
          color: COLORS.white,
          fontFamily: 'PlayfairDisplay',
        };
      },
    },
    Heading: {
      baseStyle: () => {
        return {
          color: COLORS.white,
          fontFamily: 'PlayfairDisplay',
          fontSize: 18,
        };
      },
    },
  },
});
