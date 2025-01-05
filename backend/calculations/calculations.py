from numpy import std, inf
import pandas as pd
from json_to_dataframe import json_to_data_frame

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


def count_session(data: pd.Series):
    """
        Count the number of increasing, decreasing and unchanged sessions in sequential data.

        Args:
            data (pd.DataFrame): Input DataFrame column with numerical values

        Returns:
            dict: Dictionary containing counts of:
                - increasing_sessions: Number of times value increased
                - decreasing_sessions: Number of times value decreased
                - no_change_sessions: Number of times value remained the same
        """

    sessions_count = {
        "increasing_sessions": 0,
        "decreasing_sessions": 0,
        "no_change_sessions": 0
    }

    values_column = data
    prev_reading = None
    for value in values_column:
        if prev_reading is None:
            prev_reading = value
            continue

        if value > prev_reading:
            sessions_count["increasing_sessions"] += 1
        elif value < prev_reading:
            sessions_count["decreasing_sessions"] += 1
        else:
            sessions_count["no_change_sessions"] += 1

        prev_reading = value

    return sessions_count


def calculate_distribution(currency_rate: pd.Series):
    """
    Calculate the distribution of absolute changes in currency rates.

    Args:
        currency_rate (pd.Series): Series containing currency rate values

    Returns:
        list: List of dictionaries containing:
            - rangeBegin: Start of the range interval
            - rangeEnd: End of the range interval
            - value: Count of values in this range
    """
    changes = currency_rate.diff()

    boundaries, labels = create_dynamic_ranges(changes)
    categories = pd.cut(changes, bins=boundaries, labels=labels, right=True)

    range_counts = categories.value_counts().sort_index().to_dict()
    distribution_list = [
        {"rangeBegin": index.split(";")[0],
         "rangeEnd": index.split(";")[1],
         "value": int(value)}
        for index, value in range_counts.items()
    ]

    return distribution_list

def create_dynamic_ranges(data, n_ranges=14):
    """
        Create dynamic range boundaries and labels for data distribution.

        Args:
            data (pd.Series): Input data to create ranges for
            n_ranges (int, optional): Number of ranges to create. Defaults to 14.

        Returns:
            tuple: (boundaries, labels)
                - boundaries: List of range boundary values
                - labels: List of formatted range labels
    """
    min_val = data.min()
    max_val = data.max()

    step = (max_val - min_val) / (n_ranges - 1)

    boundaries = [-inf]
    current = min_val

    for _ in range(n_ranges - 1):
        boundaries.append(current)
        current += step

    boundaries.append(inf)

    labels = []
    for i in range(len(boundaries) - 1):
        if i == 0:
            label = f"-∞;{boundaries[i + 1]:.4f}"
        elif i == len(boundaries) - 2:
            label = f"{boundaries[i]:.4f};+∞"
        else:
            label = f"{boundaries[i]:.4f};{boundaries[i + 1]:.4f}"
        labels.append(label)

    return boundaries, labels

def calculate_statistics(first_currency: dict, second_currency: dict = None):
    """
        Calculate comprehensive statistics for one or two currencies.

        Args:
            first_currency: First currency data
            second_currency (optional): Second currency data for rate calculation

        Returns:
            dict: Dictionary containing:
                - statistics: Statistical measures
                - sessions: Session counts
                - changes_distribution: Distribution of rate changes

        Raises:
            ValueError: If first_currency is None
            KeyError: If required data structure is invalid
        """
    if first_currency is None:
        raise ValueError("first_currency cannot be None")
    try:
        first_currency_dataframe = json_to_data_frame(first_currency)["mid"]
        if second_currency is not None:
            second_currency_dataframe = json_to_data_frame(second_currency)["mid"]
            rate = (first_currency_dataframe / second_currency_dataframe).round(4)
        else:
            rate = first_currency_dataframe
    except KeyError as e:
        raise e

    statistical_measures = calculate_statistical_measures(rate)
    sessions = count_session(rate)
    changes_distribution = calculate_distribution(rate)

    return {
        "statistics": statistical_measures,
        "sessions": sessions,
        "changes_distribution": changes_distribution
    }