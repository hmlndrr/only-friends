import { Button, Container, Input } from '../UI'
import {
  AiFillLock as LockIcon,
  MdOutlineMailOutline as EmailIcon,
  AiOutlineUser as UserIcon,
} from 'react-icons/all'
import { useLogin, } from '../supabase'


export default function Register() {

  const login = useLogin()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = Object.fromEntries(data.entries())
    login.login(values)
  }

  return (
    <div>
      <div className="h-[80vh]">
        <Container className="grid grid-cols-1 lg:grid-cols-3 h-full">
          <div className="grid justify-items-center lg:justify-items-start content-center lg:max-w-xl">
            <form
              className="flex flex-col space-y-3 py-4 w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="font-semibold text-xl">Login</h1>
              
              <Input
                type="text"
                label="Email"
                name="email"
                required
              />
              <Input
                type="password"
                label="Password"
                name="password"
                suffix={<LockIcon className="text-primary-600" />}
                required
              />

              <div>
                {login.error && (
                  <div className="text-red-600 text-sm">{login.error}</div>
                )}
              </div>
              
              <div>
                <Button variant="primary" type="submit" loading={login.loading}>
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly">
           
            <Button href="/signup" className="min-w-[320px] text-sm">
              Register An Account
            </Button>
          </div>
          <div className="hidden lg:grid justify-items-end content-center">
            <img src="https://raw.githubusercontent.com/nourmami/SponsoringPlateforme/frontEnd/client/public/art/headphones.svg" alt="" />
          </div>
        </Container>
      </div>
    </div>
  )
}