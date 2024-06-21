import Logo from "../components/Logo/Logo";
import RegistoForm from "../components/RegistoForm/RegistoForm";

function Registo() {
  return (
    <main className="min-h-screen grid grid-cols-[500px] place-content-center gap-8 bg-blue-365 ">
      <Logo />
      <h4 className="text-3xl font-semibold text-center text-white">
        Registe uma nova conta
      </h4>
      <RegistoForm />
    </main>
  );
}

export default Registo;
