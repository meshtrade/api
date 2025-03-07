from typing import Dict

from .network_pb2 import Network

_network_decimal_places: Dict[Network, int] = {
    Network.STELLAR_NETWORK: 7,
    Network.STELLAR_NETWORK: 7,
    Network.SA_STOCK_BROKERS_NETWORK: 2,
}

class UnsupportedNetworkError(Exception):
    """Exception raised for unsupported Network values."""

    def __init__(self, network: Network):
        self.financial_business_day_convention = network
        message = "Unsupported Network: {}".format(network)
        super().__init__(message)


def get_network_no_decimal_places(network: Network) -> int:
    """
    Returns the number of decimal places supported by the given Network
    """
    if network in _network_decimal_places:
        return _network_decimal_places[network]
    else:
        raise UnsupportedNetworkError(network)
