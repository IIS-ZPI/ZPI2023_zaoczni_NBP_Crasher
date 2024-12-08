from abc import ABC, abstractmethod


class Arithmetics(ABC):
    @abstractmethod
    def difference(self, a: float, b: float) -> float:
        pass
    @abstractmethod
    def multiplication(self, a: float, b: float) -> float:
        pass
    @abstractmethod
    def divide(self, a: float, b: float) -> float:
        pass
