import '../styles/globals.css'
import * as NextImage from 'next/image'
// import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
// import { BiLandscape } from 'react-icons/bi'
const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
