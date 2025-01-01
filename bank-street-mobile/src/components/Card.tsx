import { createBox, createRestyleComponent, createVariant } from '@shopify/restyle'
import { Theme } from '../theme'
import { TouchableOpacity } from 'react-native'

const BaseCard = createBox<Theme>()

const variant = createVariant<Theme>({
  themeKey: 'cardVariants',
  defaults: {
    backgroundColor: 'cardBackground',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 'm',
    padding: 'm',
  },
})

export const Card = createRestyleComponent<
  React.ComponentProps<typeof TouchableOpacity> & {
    variant?: keyof Theme['cardVariants']
  },
  Theme
>([variant], TouchableOpacity)
