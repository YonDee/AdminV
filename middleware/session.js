export default async function ({app, store, route, redirect}) {
  if(!store.state.user){
    return redirect('/admin/login')
  }
}
