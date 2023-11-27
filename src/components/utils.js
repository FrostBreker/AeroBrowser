export const dateParser = (num) => {
  return new Date(num ? Date.parse(num) : Date.now()).toLocaleDateString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toString()
}

export const generateId = () => {
  const list = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
  let res = ''
  for (let i = 0; i < 12; i++) {
    const rnd = Math.floor(Math.random() * list.length)
    res = res + list.charAt(rnd)
  }
  return res
}

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const convertBytesToHumanReadable = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 Bytes'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return {
    size: Math.round(bytes / Math.pow(1024, i)),
    unit: sizes[i]
  }
}

export const getDateByDonwloadDate = (timestamp) => {
  const now = new Date()
  const downloadDate = new Date(timestamp)
  if (now.getFullYear() === downloadDate.getFullYear()) {
    if (now.getMonth() === downloadDate.getMonth()) {
      if (now.getDate() === downloadDate.getDate()) {
        return 0
      }
      return 1
    }
    return 2
  }
  return 3
}

export const loadTheme = (d) => {
  const root_theme = document.querySelector(':root')
  Object.keys(d.items).forEach((key) => {
    Object.keys(d.items[key]).forEach((k) => {
      root_theme.style.setProperty(`--${k}`, d.items[key][k])
    })
  })
}
