FROM python:3.10-slim

LABEL maintainer="joao.stoky@onfly.com.br" \
      description="Pipeline de análise de Pokémon com extração da PokeAPI"

WORKDIR /app

ENV PYTHONIOENCODING=utf-8

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
