"""
Base gRPC client interface for resource management.
"""

from abc import ABC, abstractmethod


class GRPCClient(ABC):
    """Base interface that all gRPC clients should implement to ensure proper resource cleanup."""

    @abstractmethod
    def close(self) -> None:
        """Close the gRPC client connection and release all associated resources."""
        pass
