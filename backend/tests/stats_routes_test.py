import unittest
from unittest.mock import patch
from datetime import datetime, timedelta
from fastapi.testclient import TestClient

from backend.fastAPI import app

client = TestClient(app)


@patch("backend.routes.stats_routes.get_currency_rates")
class TestStatsRoutes(unittest.TestCase):
    def test_get_stats_valid_request(self, mock_get_currency_rates):
        mock_get_currency_rates.return_value = {
            "code": "USD",
            "rates": [
                {"effectiveDate": "2023-01-01", "mid": 4.20},
                {"effectiveDate": "2023-01-02", "mid": 4.25},
                {"effectiveDate": "2023-01-03", "mid": 4.18},
            ],
        }
        response = client.get(
            "/api/stats/?first_currency=usd&date_from=2023-01-01&date_end=2023-01-07"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("statistics", response.json())

    def test_get_stats_invalid_date_range(self, mock_get_currency_rates):
        response = client.get(
            "/api/stats/?first_currency=usd&date_from=2023-01-07&date_end=2023-01-01"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"detail": "invalid_data"})

    def test_get_stats_date_not_supported(self, mock_get_currency_rates):
        response = client.get(
            "/api/stats/?first_currency=usd&date_from=2000-01-01&date_end=2000-01-07"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"detail": "date_not_supported"})

    def test_get_stats_date_in_future(self, mock_get_currency_rates):
        future_date = (datetime.today() + timedelta(days=3)).strftime("%Y-%m-%d")
        url = f"/api/stats/?first_currency=usd&date_from=2023-01-01&date_end={future_date}"
        response = client.get(url)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"detail": "invalid_data"})

    def test_get_stats_invalid_date_format(self, mock_get_currency_rates):
        response = client.get(
            "/api/stats/?first_currency=usd&date_from=not-a-date&date_end=2023-01-07"
        )
        self.assertEqual(response.status_code, 400)

    def test_get_stats_non_3letter_currency(self, mock_get_currency_rates):
        response = client.get(
            "/api/stats/?first_currency=usdx&date_from=2023-01-01&date_end=2023-01-07"
        )
        self.assertEqual(response.status_code, 422)

    def test_get_stats_two_currencies_valid(self, mock_get_currency_rates):
        mock_get_currency_rates.side_effect = [
            {
                "code": "USD",
                "rates": [
                    {"effectiveDate": "2023-01-01", "mid": 4.20},
                    {"effectiveDate": "2023-01-02", "mid": 4.25},
                    {"effectiveDate": "2023-01-03", "mid": 4.18},
                ],
            },
            {
                "code": "EUR",
                "rates": [
                    {"effectiveDate": "2023-01-01", "mid": 4.50},
                    {"effectiveDate": "2023-01-02", "mid": 4.55},
                    {"effectiveDate": "2023-01-03", "mid": 4.45},
                ],
            },
        ]
        response = client.get(
            "/api/stats/?first_currency=USD&second_currency=EUR&date_from=2023-01-01&date_end=2023-01-07"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("statistics", response.json())


if __name__ == "__main__":
    unittest.main()
