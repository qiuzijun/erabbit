export const getToken = ()=>{
 const { user } = JSON.parse(localStorage.getItem('erabbit-client-pc-store'))
 return user.profile.token
}
