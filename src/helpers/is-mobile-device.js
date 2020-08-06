import { test } from 'ramda'

const isMobileDevice = test(
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  navigator.userAgent,
)

export default isMobileDevice
