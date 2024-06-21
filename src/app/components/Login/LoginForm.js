import { useState } from "react";
import ButtonLG from "../ButtonLg/ButtonLg";

function LoginForm() {
  // Estado para armazenar o e-mail e a senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o e-mail e a senha para o servidor
    console.log("E-mail:", email);
    console.log("Senha:", password);
  };

  return (
    <form
      className="p-2 bg-gray-50 border-gray-200 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="email">E-mail:</label>
        <input
          className="border border-gray-300 rounded-md  shadow-sm px-3 py-2"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="password">Senha:</label>
        <input
          className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <ButtonLG type="submit">Login</ButtonLG>
      </div>
    </form>
  );
}

export default LoginForm;
