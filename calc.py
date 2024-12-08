from arithmetics import Arithmetics


class Calc(Arithmetics):
    def difference(self, a: float, b: float) -> float:
        return a - b

    def divide(self, a: float, b: float) -> float:
        if b == 0:
            return 0
        return a/b