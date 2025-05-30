import logging
from extractor import extrair_lista_pokemons, extrair_detalhes_pokemon
from transformer import criar_dataframe, categorizar_pokemon, calcular_contagem_tipos, calcular_medias_por_tipo, top5_experiencia
from reporter import salvar_dataframe_csv, gerar_grafico_distribuicao_tipos

def configurar_logger():
    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

def main():
    configurar_logger()
    logging.info("Início do pipeline de extração e análise de Pokémon")

    # aqui monta a extração
    logging.info("Extraindo lista de Pokémon...")
    lista_pokemons = extrair_lista_pokemons()
    if not lista_pokemons:
        logging.error("Nenhum Pokémon foi extraído. Finalizando processo.")
        return

    lista_detalhes = []
    for poke in lista_pokemons:
        detalhe = extrair_detalhes_pokemon(poke['url'])
        lista_detalhes.append(detalhe)

    # aqui trata os dados 
    logging.info("Transformando dados dos Pokémon...")
    df = criar_dataframe(lista_detalhes)
    df = categorizar_pokemon(df)

    contagem_tipos = calcular_contagem_tipos(df)
    medias_por_tipo = calcular_medias_por_tipo(df)
    top5 = top5_experiencia(df)

    # aqui exporta os dados
    logging.info("Exportando dados para CSV...")
    salvar_dataframe_csv(df, 'pokemons_100.csv')
    salvar_dataframe_csv(top5[['ID', 'Nome', 'Experiência Base', 'HP', 'Ataque', 'Defesa', 'Tipos']], 'relatorio_top5_experiencia.csv')
    salvar_dataframe_csv(medias_por_tipo, 'relatorio_medias_por_tipo.csv')
    # aqui faz o gráfico
    gerar_grafico_distribuicao_tipos(contagem_tipos, 'grafico_distribuicao_tipos.png')

    logging.info("Pipeline finalizado com sucesso!")

if __name__ == "__main__":
    main()
