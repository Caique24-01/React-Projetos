import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import React, { useState } from "react";
import http from "../../http";
import imagemPrincipal from "./assets/login.png";
import "./ModalLoginUsuario.css";

interface PropsModalLoginUsuario {
    aberta: boolean,
    aoFechar: () => void,
    aoEfetuarLogin: () => void 
}

const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin} : PropsModalLoginUsuario) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const usuario = {
        email, senha
    }
    
    http.post('public/login', usuario)
    .then((resposta) => {
        sessionStorage.setItem('token', resposta.data.access_token)
        setEmail('')
        setSenha('')
        aoEfetuarLogin()
    })
    .catch((erro) => {
        if(erro?.response?.data?.message){
            alert(erro.response.data.message)
        }
        else{
            alert('Aconteceu um erro inesperado ao efetuar o seu login! Entre em contato com o suporte')
        }
    })
  }
  return (
    <AbModal
      titulo="Login"
      aberta={aberta}
      aoFechar={aoFechar}
    >
      <div className="corpoModalLogin">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado"
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto value={email} label="E-mail" onChange={setEmail} />
          <AbCampoTexto
            value={senha}
            label="Senha"
            onChange={setSenha}
            type="password"
          />
          <div className="acoes">
            <AbBotao texto="Fazer login" />
          </div>
        </form>
      </div>
    </AbModal>
  );
};

export default ModalLoginUsuario;
