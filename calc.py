from arithmetics import Arithmetics

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
