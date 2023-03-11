import React from 'react'
import { ItemRepoContainer } from './styles'

export default function ItemRepo() {
  return (
    <ItemRepoContainer>
    <h3>Título</h3>
    <p>parágrafo</p>
    <a href='#' target='_blank' className='remove'>remover</a> <br/>
    <a href='#' target='_blank' children='save'>salvar</a>
    <hr/>
    </ItemRepoContainer>
  )
}
