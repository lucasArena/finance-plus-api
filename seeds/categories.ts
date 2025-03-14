import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('expenses_categories').insert([
    { name: 'Transporte', color: '#E74C3C' }, // Vermelho vibrante
    { name: 'Moradia', color: '#2980B9' }, // Azul forte
    { name: 'Veículo', color: '#7F8C8D' }, // Cinza
    { name: 'Alimentação', color: '#AF7AC5' }, // Laranja queimado
    { name: 'Educação', color: '#F4D03F' }, // Amarelo brilhante
    { name: 'Investimentos', color: '#2ECC71' }, // Verde claro
    { name: 'Lazer e Entretenimento', color: '#8E44AD' }, // Roxo profundo
    { name: 'Saúde', color: '#D35400' }, // Coral
    { name: 'Esportes', color: '#17202A' }, // Verde suave
    { name: 'Trabalho', color: '#1F77B4' }, // Azul claro
    { name: 'Autocuidado', color: '#E84393' }, // Rosa
    { name: 'Outros', color: '#9A7D0A' }, // Azul petróleo escuro
  ])
}
