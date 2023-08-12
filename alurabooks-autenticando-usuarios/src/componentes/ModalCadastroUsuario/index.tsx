import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import React, { useState } from "react";
import http from "../../http";
import imagemPrincipal from "./assets/login.png";

import "./ModalCadastroUsuario.css";

interface PropsModalCadastroUsuario {
  aberta: boolean;
  aoFechar: () => void;
}

const ModalCadastroUsuario = ({
  aberta,
  aoFechar,
}: PropsModalCadastroUsuario) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = {
      nome,
      email,
      senha,
      endereco,
      cep,
      complemento,
    };

    http
      .post("public/registrar", usuario)
      .then(() => {
        alert("Usuário foi cadastrado com sucesso");
        setNome("");
        setEmail("");
        setEndereco("");
        setComplemento("");
        setCep("");
        setSenha("");
        setSenhaConfirmada("");
        aoFechar()
      })
      .catch(() => {
        alert("OPS! Alguma coisa deu errado!");
      });
    console.log(usuario);
  };

  return (
    <AbModal
      titulo="Cadastrar"
      aberta={aberta}
      aoFechar={aoFechar}
    >
      <div className="corpoModalCadastro">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado"
          />
        </figure>
        <form onSubmit={(e) => aoSubmeterFormular(e)}>
          <AbCampoTexto
            value={nome}
            label="Nome"
            onChange={setNome}
          ></AbCampoTexto>
          <AbCampoTexto
            value={email}
            label="E-mail"
            onChange={setEmail}
          ></AbCampoTexto>
          <AbCampoTexto
            value={endereco}
            label="Endereço"
            onChange={setEndereco}
          ></AbCampoTexto>
          <AbCampoTexto
            value={complemento}
            label="Complemento"
            onChange={setComplemento}
          ></AbCampoTexto>
          <AbCampoTexto
            value={cep}
            label="CEP"
            onChange={setCep}
          ></AbCampoTexto>
          <AbCampoTexto
            value={senha}
            label="Senha"
            onChange={setSenha}
            type={"password"}
          ></AbCampoTexto>
          <AbCampoTexto
            value={senhaConfirmada}
            label="Senha Confirmada"
            onChange={setSenhaConfirmada}
            type={"password"}
          ></AbCampoTexto>
          <div className="acoes">
            <AbBotao texto="Cadastrar" />
          </div>
        </form>
      </div>
    </AbModal>
  );
};

export default ModalCadastroUsuario;
