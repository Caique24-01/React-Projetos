import { useCallback, useMemo, useState } from "react";
import { useUsuarioLogado } from "../../shared/hooks";
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
  const { nomeDoUsuario } = useUsuarioLogado();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const emailLength = useMemo(() => {
    return email.length;
  }, [email.length]);

  // useEffect(() => {
  //     if(window.confirm("Você é macho?")){
  //         console.log("Macho")
  //     } else {
  //         console.log("Franga")
  //     }
  // }, [])

  // useEffect(() => {
  //     console.log(email)
  // }, [email])

  // useEffect(() => {
  //     console.log(senha)
  // }, [senha])

  const handleEntrar = useCallback(() => {
    console.log(email, senha);
  }, [email, senha]);

  return (
    <div>
      <form>
        <p>Quantidade de caracteres no email: {emailLength}</p>
        <p>{nomeDoUsuario}</p>
        <InputLogin
          label="Email"
          value={email}
          onChange={(newValue) => setEmail(newValue)}
        />
        <InputLogin
          label="Senha"
          value={senha}
          type="password"
          onChange={(newValue) => setSenha(newValue)}
        />
        <ButtonLogin type="button" onClick={handleEntrar}>
          Entrar
        </ButtonLogin>
      </form>
    </div>
  );
};
