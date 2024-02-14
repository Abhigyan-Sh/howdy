export function removeUserInfoAndRedirect(router) 
{
  localStorage.removeItem('userInfo')
  router.push('/')
}