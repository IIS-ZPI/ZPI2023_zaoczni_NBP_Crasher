import httpx

nbp_api_url = "https://api.nbp.pl/api/exchangerates/rates/a"


async def get_currency_rates(currency_code: str, date_from: str, date_end: str) -> str:
    currency_code = currency_code.lower()
    url = f"{nbp_api_url}/{currency_code}/{date_from}/{date_end}/"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise ConnectionError
