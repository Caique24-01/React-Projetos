import React from "react"
import styled from "styled-components";

export interface AbTagStyleProps {
    contexto?: 'primario' | 'secundario'
}
export interface AbTagProps extends AbTagStyleProps {
    texto: string
}

const TagStyled = styled.div<AbTagStyleProps>`
    padding: 16px 24px;
    color: #FFFFFF;
    background: ${(props: AbTagStyleProps) => props.contexto === 'primario' ? '#EB9B00' : 'linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%)'};
    font-weight: 700;
    font-size: 24px;
    display: inline-block;
    font-family: sans-serif;
`

export const AbTag = ({ texto, contexto = 'primario' }: AbTagProps) => {
    return (
        <TagStyled contexto={contexto}>
            {texto}
        </TagStyled>
    )
}