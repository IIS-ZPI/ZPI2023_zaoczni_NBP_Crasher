from typing import List, Dict, Any


def merge_currency_data(responses: List[str]) -> Dict[str, Any]:
    if not responses:
        return {}

    merged_result = {
        "table": responses[0]["table"],
        "currency": responses[0]["currency"],
        "code": responses[0]["code"],
        "rates": [],
    }

    for response in responses:
        merged_result["rates"].extend(response["rates"])
    return merged_result
