from arithmetics import Arithmetics
from math import log
# Test 3

class Calc(Arithmetics):
    def addition(self, a: float, b: float) -> float:
        return a + b

    def difference(self, a: float, b: float) -> float:
        return a - b
    
    def multiplication(self, a: float, b: float) -> float:
        return a * b
    
    def divide(self, a: float, b: float) -> float:
        if b == 0:
            return 0
        return a/b
    
    # New method
    def power(self, a: float, b: float) -> float:
        return a ** b

    def log(self, a: float, b: float) -> float:
        return log(a, b)
