import matplotlib.pyplot as plt
import seaborn as sns
import logging

def salvar_dataframe_csv(df, caminho_arquivo):
    try:
        df.to_csv(caminho_arquivo, index=False, encoding='utf-8')
        logging.info(f'Arquivo salvo: {caminho_arquivo}')
    except Exception as e:
        logging.error(f'Erro ao salvar arquivo {caminho_arquivo}: {e}')

def gerar_grafico_distribuicao_tipos(contagem_tipos, caminho_imagem):
    try:
        plt.figure(figsize=(12,6))
        sns.barplot(x='Tipo', y='Quantidade', data=contagem_tipos, palette='viridis')
        plt.title('Distribuição de Pokémon por Tipo')
        plt.xlabel('Tipo')
        plt.ylabel('Quantidade')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(caminho_imagem)
        plt.close()
        logging.info(f'Gráfico salvo: {caminho_imagem}')
    except Exception as e:
        logging.error(f'Erro ao gerar/salvar gráfico: {e}')
