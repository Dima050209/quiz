import Header from "@/components/header"
import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <>
    <Header withLogin={false}/>
    <div className="flex min-h-svh w-full  justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </>
  )
}
