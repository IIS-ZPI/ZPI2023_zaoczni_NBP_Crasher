from abc import ABC, abstractmethod


class Arithmetics(ABC):
    @abstractmethod
    def addition(self, a: float, b: float) -> float:
        pass

    @abstractmethod
    def difference(self, a: float, b: float) -> float:
        pass
