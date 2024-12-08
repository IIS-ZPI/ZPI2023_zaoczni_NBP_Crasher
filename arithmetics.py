from abc import ABC, abstractmethod


class Arithmetics(ABC):
    @abstractmethod
    def addition(self, a: float, b: float) -> float:
        pass

    @abstractmethod
    def difference(self, a: float, b: float) -> float:
        pass

    @abstractmethod
    def multiplication(self, a: float, b: float) -> float:
        pass
    
    @abstractmethod
<<<<<<< HEAD
    def power(self, a: float, b: float) -> float:
        pass
=======
    def power(self, a: float, b: int) -> float:
        pass
      
    @abstractmethod
    def divide(self, a: float, b: float) -> float:
        pass
>>>>>>> b0998852ee5e1f3a8b1f073a37aa96e0f8ee72fc
