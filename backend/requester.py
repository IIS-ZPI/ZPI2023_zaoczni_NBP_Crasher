from aiocache import Cache
from aiocache.decorators import cached
import datetime
import httpx
from typing import List, Dict, Any
from backend.routes.response_merge import merge_currency_data
import asyncio

date_format = "%Y-%m-%d"
nbp_api_url = "https://api.nbp.pl/api/exchangerates/rates/a"

TTL = 60 * 60  # 60mins cache
max_days = 365


@cached(ttl=TTL, cache=Cache.MEMORY)
async def get_currency_rates(
    currency_code: str, date_from: str, date_end: str
) -> List[Dict[str, Any]]:
    start_date = datetime.datetime.strptime(date_from, date_format)
    end_date = datetime.datetime.strptime(date_end, date_format)
    tasks = []

    while start_date <= end_date:
        next_end_date = min(
            start_date + datetime.timedelta(days=max_days - 1), end_date
        )
        if next_end_date == start_date:
            break

        url = f"{nbp_api_url}/{currency_code}/{start_date.strftime(date_format)}/{next_end_date.strftime(date_format)}/"
        tasks.append(fetch_currency_data(url))
        start_date = next_end_date + datetime.timedelta(days=1)

    results = await asyncio.gather(*tasks)
    return merge_currency_data(results)


async def fetch_currency_data(url: str) -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise ConnectionError(f"Error fetching data from {url}")
