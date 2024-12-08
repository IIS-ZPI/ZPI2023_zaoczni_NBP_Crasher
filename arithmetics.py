from abc import ABC, abstractmethod


class ArithmeticsAdd(ABC):
    @abstractmethod
    def add(self, a: float, b: float) -> float:
        pass
