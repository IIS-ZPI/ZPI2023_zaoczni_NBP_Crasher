from time import strptime
from fastapi import APIRouter, Query, HTTPException
from datetime import datetime, timedelta
import requests
import json

from backend.calculations.calculations import calculate_statistics

stats_routes = APIRouter(tags=["Statistics router"])


@stats_routes.get("/", responses={
    400: {
        "description": "Bad request",
        "content": {
            "application/json": {
                "example": [
                    {"detail": "invalid_data"},
                    {"detail": "date_not_supported"},
                ]
            }
        }
    },
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "example": {
                    "detail": "internal_server_error"
                },

            }
        }
    },
    200: {
        "description": "OK",
        "content": {
            "application/json": {
                "example": {

                    "statistics": {
                        "mode": {
                            "3.9355": 2,
                            "3.9392": 2,
                            "3.9368": 2,
                            "3.9389": 2,
                            "3.9183": 2,
                            "3.9922": 2,
                            "4.0202": 2,
                            "4.0189": 2,
                            "3.9866": 2,
                            "4.0341": 2
                        },
                        "standard_deviation": 0.0763,
                        "variation_coefficient": 1.9158,
                        "median": 3.984
                    },
                    "sessions": {
                        "increasing_sessions": 116,
                        "decreasing_sessions": 123,
                        "no_change_sessions": 0
                    },
                    "changes_distribution": [
                        {
                            "rangeBegin": "-∞",
                            "rangeEnd": "-0.0116",
                            "value": 1
                        },
                        {
                            "rangeBegin": "-0.0116",
                            "rangeEnd": "-0.0090",
                            "value": 5
                        },
                        {
                            "rangeBegin": "-0.0090",
                            "rangeEnd": "-0.0064",
                            "value": 15
                        },
                        {
                            "rangeBegin": "-0.0064",
                            "rangeEnd": "-0.0038",
                            "value": 37
                        },
                        {
                            "rangeBegin": "-0.0038",
                            "rangeEnd": "-0.0012",
                            "value": 44
                        },
                        {
                            "rangeBegin": "-0.0012",
                            "rangeEnd": "0.0014",
                            "value": 46
                        },
                        {
                            "rangeBegin": "0.0014",
                            "rangeEnd": "0.0040",
                            "value": 44
                        },
                        {
                            "rangeBegin": "0.0040",
                            "rangeEnd": "0.0066",
                            "value": 25
                        },
                        {
                            "rangeBegin": "0.0066",
                            "rangeEnd": "0.0092",
                            "value": 10
                        },
                        {
                            "rangeBegin": "0.0092",
                            "rangeEnd": "0.0118",
                            "value": 5
                        },
                        {
                            "rangeBegin": "0.0118",
                            "rangeEnd": "0.0145",
                            "value": 3
                        },
                        {
                            "rangeBegin": "0.0145",
                            "rangeEnd": "0.0171",
                            "value": 2
                        },
                        {
                            "rangeBegin": "0.0171",
                            "rangeEnd": "0.0197",
                            "value": 1
                        },
                        {
                            "rangeBegin": "0.0197",
                            "rangeEnd": "+∞",
                            "value": 1
                        }
                    ]

                }
            }
        }
    }
},
                  description="Returns analysis of rates for currency/currencies passed to endpoint as parameters for specified time span")
async def get_stats(first_currency: str = Query(default="usd",
                                                description="First currency 3 characters symbol",
                                                max_length=3),
                    second_currency: str | None = Query(default="",
                                                        description="Second currency 3 characters symbol",
                                                        max_length=3),
                    date_from: str = Query(default=(datetime.today() - timedelta(days=7)).strftime("%Y-%m-%d"),
                                           description="Start date from which data will be fetched"),
                    date_end: str = Query(default=datetime.today().strftime("%Y-%m-%d"),
                                          description="End date for which data will be fetched"),
                    ):
    if strptime(date_from, "%Y-%m-%d") > strptime(date_end, "%Y-%m-%d") or \
            strptime(date_end, "%Y-%m-%d") > strptime(datetime.today().strftime("%Y-%m-%d"), "%Y-%m-%d"):
        raise HTTPException(status_code=400, detail="invalid_data")

    if strptime(date_from, "%Y-%m-%d") < strptime("2002-01-02", "%Y-%m-%d"):
        raise HTTPException(status_code=400, detail="date_not_supported")

    first_currency_data = get_currency_rates(first_currency, date_from, date_end)
    try:
        if second_currency != "":
            second_currency_data = get_currency_rates(second_currency, date_from, date_end)
            return calculate_statistics(first_currency_data, second_currency_data)

        return calculate_statistics(first_currency_data)
    except KeyError | ValueError | ConnectionError:
        raise HTTPException(status_code=500, detail="internal_server_error")


def get_currency_rates(currency_code: str, date_from: str, date_end: str) -> str:
    currency_code = currency_code.lower()
    url = f"https://api.nbp.pl/api/exchangerates/rates/a/{currency_code}/{date_from}/{date_end}/"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise ConnectionError
