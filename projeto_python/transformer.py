import pandas as pd
import logging

def criar_dataframe(lista_pokemons_completo):
    dados = []
    for info in lista_pokemons_completo:
        if info is None:
            continue

        try:
            id_pokemon = info['id']
            nome = info['name'].capitalize()
            experiencia = info['base_experience']
            
            tipos = [t['type']['name'].capitalize() for t in info['types']]

            hp = ataque = defesa = None
            for stat in info['stats']:
                nome_stat = stat['stat']['name']
                if nome_stat == 'hp':
                    hp = stat['base_stat']
                elif nome_stat == 'attack':
                    ataque = stat['base_stat']
                elif nome_stat == 'defense':
                    defesa = stat['base_stat']

            dados.append({
                'ID': id_pokemon,
                'Nome': nome,
                'Experiência Base': experiencia,
                'Tipos': tipos,
                'HP': hp,
                'Ataque': ataque,
                'Defesa': defesa
            })
        except Exception as e:
            logging.error(f'Erro ao processar dados do Pokémon: {e}')
            continue

    df = pd.DataFrame(dados)
    return df

def categorizar_pokemon(df):
    def categoria(exp):
        if exp < 50:
            return 'Fraco'
        elif 50 <= exp <= 100:
            return 'Médio'
        else:
            return 'Forte'
    df['Categoria'] = df['Experiência Base'].apply(categoria)
    return df

def calcular_contagem_tipos(df):
    df_explodido = df.explode('Tipos')
    contagem = df_explodido['Tipos'].value_counts().reset_index()
    contagem.columns = ['Tipo', 'Quantidade']
    return contagem

def calcular_medias_por_tipo(df):
    df_explodido = df.explode('Tipos')
    medias = df_explodido.groupby('Tipos')[['Ataque', 'Defesa', 'HP']].mean().reset_index()
    return medias

def top5_experiencia(df):
    return df.sort_values('Experiência Base', ascending=False).head(5)
