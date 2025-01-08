get_stats_responses = {
    400: {
        "description": "Bad request",
        "content": {
            "application/json": {
                "example": [
                    {"detail": "invalid_data"},
                    {"detail": "date_not_supported"},
                ]
            }
        },
    },
    500: {
        "description": "Internal Server Error",
        "content": {
            "application/json": {
                "example": {"detail": "internal_server_error"},
            }
        },
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
                            "4.0341": 2,
                        },
                        "standard_deviation": 0.0763,
                        "variation_coefficient": 1.9158,
                        "median": 3.984,
                    },
                    "sessions": {
                        "increasing_sessions": 116,
                        "decreasing_sessions": 123,
                        "no_change_sessions": 0,
                    },
                    "changes_distribution": [
                        {"rangeBegin": "-inf", "rangeEnd": "-0.0116", "value": 1},
                        {
                            "rangeBegin": "-0.0116",
                            "rangeEnd": "-0.0090",
                            "value": 5,
                        },
                        {
                            "rangeBegin": "-0.0090",
                            "rangeEnd": "-0.0064",
                            "value": 15,
                        },
                        {
                            "rangeBegin": "-0.0064",
                            "rangeEnd": "-0.0038",
                            "value": 37,
                        },
                        {
                            "rangeBegin": "-0.0038",
                            "rangeEnd": "-0.0012",
                            "value": 44,
                        },
                        {
                            "rangeBegin": "-0.0012",
                            "rangeEnd": "0.0014",
                            "value": 46,
                        },
                        {"rangeBegin": "0.0014", "rangeEnd": "0.0040", "value": 44},
                        {"rangeBegin": "0.0040", "rangeEnd": "0.0066", "value": 25},
                        {"rangeBegin": "0.0066", "rangeEnd": "0.0092", "value": 10},
                        {"rangeBegin": "0.0092", "rangeEnd": "0.0118", "value": 5},
                        {"rangeBegin": "0.0118", "rangeEnd": "0.0145", "value": 3},
                        {"rangeBegin": "0.0145", "rangeEnd": "0.0171", "value": 2},
                        {"rangeBegin": "0.0171", "rangeEnd": "0.0197", "value": 1},
                        {"rangeBegin": "0.0197", "rangeEnd": "+inf", "value": 1},
                    ],
                }
            }
        },
    },
}
