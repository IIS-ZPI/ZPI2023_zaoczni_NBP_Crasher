import asyncio
from time import strptime
from fastapi import APIRouter, Query, HTTPException
from datetime import datetime, timedelta


from backend.calculations.calculations import calculate_statistics
from backend.requester import get_currency_rates
from backend.routes.stats_routes_responses import get_stats_responses

stats_routes = APIRouter(tags=["Statistics router"])
date_format = "%Y-%m-%d"


@stats_routes.get(
    "/",
    responses=get_stats_responses,
    description="Returns analysis of rates for currency/currencies passed to endpoint as parameters for specified time span",
)
async def get_stats(
    first_currency: str = Query(
        default="usd", description="First currency 3 characters symbol", max_length=3
    ),
    second_currency: str | None = Query(
        default="", description="Second currency 3 characters symbol", max_length=3
    ),
    date_from: str = Query(
        default=(datetime.today() - timedelta(days=7)).strftime(date_format),
        description="Start date from which data will be fetched",
    ),
    date_end: str = Query(
        default=datetime.today().strftime(date_format),
        description="End date for which data will be fetched",
    ),
):
    try:
        datetime.strptime(date_from, date_format)
        datetime.strptime(date_end, date_format)
    except ValueError:
        raise HTTPException(status_code=400, detail="invalid_date_format")
    if strptime(date_from, date_format) > strptime(date_end, date_format) or strptime(
        date_end, date_format
    ) > strptime(datetime.today().strftime(date_format), date_format):
        raise HTTPException(status_code=400, detail="invalid_data")

    if strptime(date_from, date_format) < strptime("2002-01-02", date_format):
        raise HTTPException(status_code=400, detail="date_not_supported")
    if strptime(date_from, date_format) == strptime(date_end, date_format):
        raise HTTPException(status_code=400, detail="invalid_data")
    try:
        first_currency_data = asyncio.create_task(
            get_currency_rates(first_currency, date_from, date_end)
        )
        if second_currency != "":
            second_currency_data = asyncio.create_task(
                get_currency_rates(second_currency, date_from, date_end)
            )

            first_currency_data, second_currency_data = await asyncio.gather(
                first_currency_data, second_currency_data
            )

            return calculate_statistics(first_currency_data, second_currency_data)
        first_currency_data = await first_currency_data
        return calculate_statistics(first_currency_data)
    except KeyError | ValueError | ConnectionError:
        raise HTTPException(status_code=500, detail="internal_server_error")
