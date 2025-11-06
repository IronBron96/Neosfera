export function nextPage(tab, router) {
  if (tab === 'home') {
    router.push('/')
  } else {
    router.push(`/${tab}`)
  }
}
