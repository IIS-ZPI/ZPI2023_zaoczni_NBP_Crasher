import pandas as pd


def json_to_data_frame(json_content: dict):
    """
    Converts a json object into a pandas dataframe.

    Args:
        json_content (dict):

    Returns:
         pd.DataFrame: DataFrame containing the data passed in JSON as argument
    """
    try:
        df = pd.DataFrame(json_content["rates"])
    except KeyError:
        raise KeyError
    return df
