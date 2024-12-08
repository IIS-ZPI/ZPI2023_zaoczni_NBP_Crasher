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
    def power(self, a: float, b: float) -> float:
        pass
      
    @abstractmethod
    def divide(self, a: float, b: float) -> float:
        pass

    #comment 2
    #comment 3
    #turbo comment
