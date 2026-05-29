// Import all icon sets from react-icons
import * as LuIcons from "react-icons/lu";

// Combine all icons into a single object
const ALL_ICON_COLLECTIONS = {
  ...LuIcons,
}

// Filter to get only icon components (functions/classes)
export const iconsRegistry = Object.entries(ALL_ICON_COLLECTIONS)
  .filter(([, value]) => typeof value === 'function')
  .map(([name]) => name)
  .sort()

export function getIcon(iconName: string) {
  return ALL_ICON_COLLECTIONS[iconName as keyof typeof ALL_ICON_COLLECTIONS]
}

// Popular icons for social media and web (loaded by default)
export const socialIcons = [
  'LuFacebook',
  'LuInstagram',
  'LuTwitter',
  'LuLinkedin',
  'LuYoutube',
  'LuTwitch',
  'LuGlobe',
]
