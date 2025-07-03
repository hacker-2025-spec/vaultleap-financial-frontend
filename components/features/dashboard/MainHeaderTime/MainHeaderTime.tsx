'use client'

import { getFormattedCurrentTime } from '@/utils/time'

const MainHeaderTime = () => {
  return <span className="text-muted-foreground">{getFormattedCurrentTime()}</span>
}

export default MainHeaderTime
