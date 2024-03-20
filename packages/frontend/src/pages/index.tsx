import DemoOne from "./admin"
import CreateOrder from "./admin/order/create"

// Function to check if the user is logged in
const isUserLoggedIn = () => {
  const isLoggedIn = false

  return isLoggedIn
}

const Home = () => {
  const isLoggedIn = isUserLoggedIn()

  //todo: remove old login logic
  // return isLoggedIn ? <DemoOne /> : <SignIn />
  return <DemoOne />
}

export default Home
