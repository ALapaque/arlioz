const isMobileWeb = (win) => isMobile(win) && !isHybrid(win)

const isIpad = (win) => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true
  }

  // iOS 13+
  return testUserAgent(win, /Macintosh/i) && isMobile(win)
}

const isIphone = (win) => testUserAgent(win, /iPhone/i)

const isIOS = (win) => testUserAgent(win, /iPhone|iPod/i) || isIpad(win)

const isAndroid = (win) => testUserAgent(win, /android|sink/i)

const isAndroidTablet = (win) => {
  return isAndroid(win) && !testUserAgent(win, /mobile/i)
}

const isPhablet = (win) => {
  const width = win.innerWidth
  const height = win.innerHeight
  const smallest = Math.min(width, height)
  const largest = Math.max(width, height)

  return smallest > 390 && smallest < 520 && largest > 620 && largest < 800
}

const isTablet = (win) => {
  const width = win.innerWidth
  const height = win.innerHeight
  const smallest = Math.min(width, height)
  const largest = Math.max(width, height)

  return isIpad(win) || isAndroidTablet(win) || (smallest > 460 && smallest < 820 && largest > 780 && largest < 1400)
}

const isMobile = (win) => matchMedia(win, '(any-pointer:coarse)')

const isDesktop = (win) => !isMobile(win)

const isHybrid = (win) => isCordova(win) || isCapacitorNative(win)

const isCordova = (win) => !!(win['cordova'] || win['phonegap'] || win['PhoneGap'])

const isCapacitorNative = (win) => {
  const capacitor = win['Capacitor']
  return !!capacitor?.isNative
}

const isElectron = (win) => testUserAgent(win, /electron/i)

const isPWA = (win) =>
  (win.matchMedia?.('(display-mode: standalone)').matches || win.navigator.standalone)

const testUserAgent = (win, expr) => expr.test(win.navigator.userAgent)

const matchMedia = (win, query) => win.matchMedia?.(query).matches

const PlatformUtils = (win = window) => ({
  isIpad: isIpad(win),
  isIphone: isIphone(win),
  isIOS: isIOS(win),
  isAndroid: isAndroid(win),
  isPhablet: isPhablet(win),
  isTablet: isTablet(win),
  isCordova: isCordova(win),
  isCapacitorNative: isCapacitorNative(win),
  isElectron: isElectron(win),
  isPWA: isPWA(win),
  isMobile: isMobile(win),
  isMobileWeb: isMobileWeb(win),
  isDesktop: isDesktop(win),
  isHybrid: isHybrid(win)
})

export default PlatformUtils
