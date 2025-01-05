import pandas as pd


def json_to_data_frame(json_content: dict):
    try:
        df = pd.DataFrame(json_content["rates"])
    except KeyError:
        raise KeyError
    return df
