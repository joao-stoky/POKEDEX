import requests
import logging

def extrair_lista_pokemons(limit=100, offset=0):
    url = f'https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}'
    try:
        resposta = requests.get(url)
        resposta.raise_for_status()
        dados = resposta.json()
        return dados['results']
    except requests.RequestException as e:
        logging.error(f'Erro ao buscar lista de pokemons: {e}')
        return []

def extrair_detalhes_pokemon(url_pokemon):
    try:
        resposta = requests.get(url_pokemon)
        resposta.raise_for_status()
        return resposta.json()
    except requests.RequestException as e:
        logging.error(f'Erro ao buscar detalhes do pokemon {url_pokemon}: {e}')
        return None
