import unittest
import pandas as pd
from numpy import inf, std
from backend.calculations.calculations import (
    calculate_statistical_measures,
    count_session,
    calculate_distribution,
    create_dynamic_ranges,
)


class TestCalculateStatisticalMeasures(unittest.TestCase):
    def setUp(self):
        self.mode_key = "mode"
        self.median_key = "median"
        self.standard_deviation_key = "standard_deviation"
        self.variation_coefficient_key = "variation_coefficient"

    def test_valid_data(self):
        data = pd.Series([1, 2, 2, 3, 4, 5])
        result = calculate_statistical_measures(data)

        expected_mode = {2: 2}
        expected_median = 2.5
        expected_standard_deviation = std([1, 2, 2, 3, 4, 5], ddof=0)
        expected_variation_coefficient = (
                                                 expected_standard_deviation / expected_median
                                         ) * 100

        self.assertEqual(result[self.mode_key], expected_mode)
        self.assertAlmostEqual(result[self.median_key], expected_median, places=4)
        self.assertAlmostEqual(
            result[self.standard_deviation_key], round(expected_standard_deviation, 4)
        )
        self.assertAlmostEqual(
            result[self.variation_coefficient_key],
            round(expected_variation_coefficient, 4),
        )

    def test_empty_data(self):
        data = pd.Series([])
        with self.assertRaises(ValueError):
            calculate_statistical_measures(data)

    def test_none_data(self):
        with self.assertRaises(ValueError):
            calculate_statistical_measures(None)

    def test_single_value(self):
        data = pd.Series([5])
        result = calculate_statistical_measures(data)

        expected_mode = {5: 1}
        expected_median = 5
        expected_standard_deviation = 0.0
        expected_variation_coefficient = 0.0

        self.assertEqual(result[self.mode_key], expected_mode)
        self.assertAlmostEqual(result[self.median_key], expected_median, places=4)
        self.assertAlmostEqual(
            result[self.standard_deviation_key], expected_standard_deviation, places=4
        )
        self.assertAlmostEqual(
            result[self.variation_coefficient_key],
            expected_variation_coefficient,
            places=4,
        )

    def test_multiple_modes(self):
        data = pd.Series([1, 1, 2, 2, 3])
        result = calculate_statistical_measures(data)

        expected_mode = {1: 2, 2: 2}
        expected_median = 2
        expected_standard_deviation = std([1, 1, 2, 2, 3], ddof=0)
        expected_variation_coefficient = (
                                                 expected_standard_deviation / expected_median
                                         ) * 100

        self.assertEqual(result[self.mode_key], expected_mode)
        self.assertAlmostEqual(result[self.median_key], expected_median, places=4)
        self.assertAlmostEqual(
            result[self.standard_deviation_key], round(expected_standard_deviation, 4)
        )
        self.assertAlmostEqual(
            result[self.variation_coefficient_key],
            round(expected_variation_coefficient, 4),
        )


class TestCountSession(unittest.TestCase):
    def setUp(self):
        self.increasing_sessions_key = "increasing_sessions"
        self.decreasing_sessions_key = "decreasing_sessions"
        self.no_change_sessions_key = "no_change_sessions"

    def test_valid_data(self):
        data = pd.Series([1, 2, 2, 3, 1, 1, 4])
        result = count_session(data)

        expected_result = {
            self.increasing_sessions_key: 3,
            self.decreasing_sessions_key: 1,
            self.no_change_sessions_key: 2,
        }

        self.assertEqual(result, expected_result)

    def test_empty_data(self):
        data = pd.Series([])
        with self.assertRaises(ValueError):
            count_session(data)

    def test_none_data(self):
        with self.assertRaises(ValueError):
            count_session(None)

    def test_single_value(self):
        data = pd.Series([5])
        result = count_session(data)

        expected_result = {
            self.increasing_sessions_key: 0,
            self.decreasing_sessions_key: 0,
            self.no_change_sessions_key: 0,
        }

        self.assertEqual(result, expected_result)

    def test_all_increasing(self):
        data = pd.Series([1, 2, 3, 4, 5])
        result = count_session(data)

        expected_result = {
            self.increasing_sessions_key: 4,
            self.decreasing_sessions_key: 0,
            self.no_change_sessions_key: 0,
        }

        self.assertEqual(result, expected_result)

    def test_all_decreasing(self):
        data = pd.Series([5, 4, 3, 2, 1])
        result = count_session(data)

        expected_result = {
            self.increasing_sessions_key: 0,
            self.decreasing_sessions_key: 4,
            self.no_change_sessions_key: 0,
        }

        self.assertEqual(result, expected_result)

    def test_no_changes(self):
        data = pd.Series([3, 3, 3, 3])
        result = count_session(data)

        expected_result = {
            self.increasing_sessions_key: 0,
            self.decreasing_sessions_key: 0,
            self.no_change_sessions_key: 3,
        }

        self.assertEqual(result, expected_result)


class TestCalculateDistribution(unittest.TestCase):
    def setUp(self):
        self.range_begin_key = "rangeBegin"
        self.range_end_key = "rangeEnd"
        self.value_key = "value"

    def test_valid_data(self):
        currency_rate = pd.Series([1.0, 1.1, 1.3, 1.2, 1.5, 1.8])
        result = calculate_distribution(currency_rate)

        expected_result = [
            {"rangeBegin": "-inf", "rangeEnd": "-0.1000", "value": 1},
            {"rangeBegin": "-0.1000", "rangeEnd": "-0.0692", "value": 0},
            {"rangeBegin": "-0.0692", "rangeEnd": "-0.0385", "value": 0},
            {"rangeBegin": "-0.0385", "rangeEnd": "-0.0077", "value": 0},
            {"rangeBegin": "-0.0077", "rangeEnd": "0.0231", "value": 0},
            {"rangeBegin": "0.0231", "rangeEnd": "0.0538", "value": 0},
            {"rangeBegin": "0.0538", "rangeEnd": "0.0846", "value": 0},
            {"rangeBegin": "0.0846", "rangeEnd": "0.1154", "value": 1},
            {"rangeBegin": "0.1154", "rangeEnd": "0.1462", "value": 0},
            {"rangeBegin": "0.1462", "rangeEnd": "0.1769", "value": 0},
            {"rangeBegin": "0.1769", "rangeEnd": "0.2077", "value": 1},
            {"rangeBegin": "0.2077", "rangeEnd": "0.2385", "value": 0},
            {"rangeBegin": "0.2385", "rangeEnd": "0.2692", "value": 0},
            {"rangeBegin": "0.2692", "rangeEnd": "+inf", "value": 2},
        ]

        self.assertEqual(result, expected_result)

    def test_empty_series(self):
        currency_rate = pd.Series([])
        with self.assertRaises(ValueError):
            calculate_distribution(currency_rate)

    def test_none_input(self):
        with self.assertRaises(ValueError):
            calculate_distribution(None)

    def test_no_changes(self):
        currency_rate = pd.Series([1.0, 1.0, 1.0, 1.0])
        result = calculate_distribution(currency_rate)

        expected_result = [
            {"rangeBegin": "-inf", "rangeEnd": "0.0000", "value": 3},
            {"rangeBegin": "0.0000", "rangeEnd": "0.5000", "value": 0},
            {"rangeBegin": "0.5000", "rangeEnd": "1.0000", "value": 0},
            {"rangeBegin": "1.0000", "rangeEnd": "1.5000", "value": 0},
            {"rangeBegin": "1.5000", "rangeEnd": "2.0000", "value": 0},
            {"rangeBegin": "2.0000", "rangeEnd": "2.5000", "value": 0},
            {"rangeBegin": "2.5000", "rangeEnd": "3.0000", "value": 0},
            {"rangeBegin": "3.0000", "rangeEnd": "3.5000", "value": 0},
            {"rangeBegin": "3.5000", "rangeEnd": "4.0000", "value": 0},
            {"rangeBegin": "4.0000", "rangeEnd": "4.5000", "value": 0},
            {"rangeBegin": "4.5000", "rangeEnd": "5.0000", "value": 0},
            {"rangeBegin": "5.0000", "rangeEnd": "5.5000", "value": 0},
            {"rangeBegin": "5.5000", "rangeEnd": "6.0000", "value": 0},
            {"rangeBegin": "6.0000", "rangeEnd": "+inf", "value": 0},
        ]

        self.assertEqual(result, expected_result)

    def test_negative_changes(self):
        currency_rate = pd.Series([2.0, 1.5, 1.0, 0.5])
        result = calculate_distribution(currency_rate)

        expected_result = [
            {"rangeBegin": "-inf", "rangeEnd": "-0.5000", "value": 3},
            {"rangeBegin": "-0.5000", "rangeEnd": "0.0000", "value": 0},
            {"rangeBegin": "0.0000", "rangeEnd": "0.5000", "value": 0},
            {"rangeBegin": "0.5000", "rangeEnd": "1.0000", "value": 0},
            {"rangeBegin": "1.0000", "rangeEnd": "1.5000", "value": 0},
            {"rangeBegin": "1.5000", "rangeEnd": "2.0000", "value": 0},
            {"rangeBegin": "2.0000", "rangeEnd": "2.5000", "value": 0},
            {"rangeBegin": "2.5000", "rangeEnd": "3.0000", "value": 0},
            {"rangeBegin": "3.0000", "rangeEnd": "3.5000", "value": 0},
            {"rangeBegin": "3.5000", "rangeEnd": "4.0000", "value": 0},
            {"rangeBegin": "4.0000", "rangeEnd": "4.5000", "value": 0},
            {"rangeBegin": "4.5000", "rangeEnd": "5.0000", "value": 0},
            {"rangeBegin": "5.0000", "rangeEnd": "5.5000", "value": 0},
            {"rangeBegin": "5.5000", "rangeEnd": "+inf", "value": 0},
        ]

        self.assertEqual(result, expected_result)


class TestCreateDynamicRanges(unittest.TestCase):
    def test_valid_data(self):
        data = pd.Series([1, 2, 3, 4, 5])
        boundaries, labels = create_dynamic_ranges(data, n_ranges=5)

        expected_boundaries = [-inf, 1.0, 2.0, 3.0, 4.0, inf]
        expected_labels = [
            "-inf;1.0000",
            "1.0000;2.0000",
            "2.0000;3.0000",
            "3.0000;4.0000",
            "4.0000;+inf",
        ]

        self.assertEqual(boundaries, expected_boundaries)
        self.assertEqual(labels, expected_labels)

    def test_single_value_data(self):
        data = pd.Series([5])
        boundaries, labels = create_dynamic_ranges(data, n_ranges=3)

        expected_boundaries = [-inf, 5.0, 10.0, inf]
        expected_labels = ["-inf;5.0000", "5.0000;10.0000", "10.0000;+inf"]

        self.assertEqual(boundaries, expected_boundaries)
        self.assertEqual(labels, expected_labels)

    def test_empty_data(self):
        data = pd.Series([])
        with self.assertRaises(ValueError):
            create_dynamic_ranges(data)

    def test_none_data(self):
        with self.assertRaises(ValueError):
            create_dynamic_ranges(None)


if __name__ == "__main__":
    unittest.main()
