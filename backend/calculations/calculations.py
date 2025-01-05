from numpy import std
import pandas as pd


def calculate_statistical_measures(data: pd.Series):
    """
       Calculate basic statistical measures for a given DataFrame column.

       Args:
           data (set): Input set with numerical values

       Returns:
           dict: Dictionary containing:
               - mode: Dictionary with mode values and their frequencies
               - standard_deviation: Standard deviation rounded to 4 decimal places
               - variation_coefficient: Coefficient of variation as percentage, rounded to 4 decimal places
               - median: Median value rounded to 4 decimal places
       """

    values_column = data.sort_values()

    count_values = values_column.value_counts()
    mode = count_values[count_values == count_values.max()].to_dict()

    median = values_column.median()

    standard_deviation = std(values_column)

    variation_coefficient = standard_deviation / median * 100

    return {
        "mode": mode,
        "standard_deviation": round(standard_deviation, 4),
        "variation_coefficient": round(variation_coefficient, 4),
        "median": round(median, 4)
    }
