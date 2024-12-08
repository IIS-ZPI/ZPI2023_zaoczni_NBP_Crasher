from arithmetics import Arithmetics


class Calc(Arithmetics):
    def difference(self, a: float, b: float) -> float:
        return a - b

    def multiplication(self, a: float, b: float) -> float:
        return a * b