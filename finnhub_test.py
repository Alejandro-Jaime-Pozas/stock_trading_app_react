import finnhub

# Setup client
finnhub_client = finnhub.Client(api_key="cc4f982ad3ia9srm3fog")

# Stock candles
res = finnhub_client.stock_candles('AAPL', 'D', 1590988249, 1591852249)
print(res)