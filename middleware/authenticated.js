

export default async function ({ app, route, redirect }) {

  const user = app.$cookies.get('access_token')
  const authRoute = /\/auth\/*/g;
  if (!user && !route.path.match(authRoute)) {
      redirect("/auth/login")
  }
}
