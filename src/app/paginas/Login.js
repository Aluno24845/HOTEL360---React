import Logo from "../components/Logo/Logo";
import LoginForm from "../components/Login/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen grid grid-cols-[500px] place-content-center gap-8 bg-blue-365 ">
      <Logo />
      <h4 className="text-3xl font-semibold text-center text-white">
        Entre na sua conta
      </h4>
      <LoginForm />
    </main>
  );
}
