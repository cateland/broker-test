import { useCallback, useEffect, useReducer, useState } from "react";
import debounce from "lodash/debounce";

import * as brokersModule from "../../../domain/broker";
import * as brokerAPI from "../../../infrastructure/api/broker";
import * as remoteDataModule from "../../../infrastructure/utils/remoteData";

/**
 * manage loading of the  broker favorite list
 * the favorite list can be the user or the client favorite, statisticaly deduced or setup
 */
export function useBrokerFavoriteList() {
  const [favoriteList, setFavoriteList] = useState<
    remoteDataModule.RemoteData<string, Array<brokersModule.Broker>>
  >(remoteDataModule.pending());

  useEffect(function favorite() {
    brokerAPI
      .getPrefered()
      .then((response) => {
        setFavoriteList(remoteDataModule.success(response));
      })
      .catch((error) => {
        setFavoriteList(remoteDataModule.failure(error));
      });
  }, []);

  return { favoriteList };
}

type BrokerLists = {
  favorite: Array<brokersModule.Broker>;
  selectedBroker: brokersModule.Broker | null;
  brokerList: Array<brokersModule.Broker>;
  searchTerm: string;
  filteredBrokerList: remoteDataModule.RemoteData<
    string,
    Array<brokersModule.Broker>
  >;
};

export type Action =
  | { type: "SEARCH_TERM_UPDATED"; payload: string }
  | {
      type: "FILTERED_LOADED_SUCCESSFULLY";
      payload: Array<brokersModule.Broker>;
    }
  | { type: "FILTERED_FAILED_LOADING"; payload: string }
  | { type: "BROKER_SELECTED"; payload: brokersModule.Broker | null };

const DEBOUNCE_DELAY = 500;

function reducer(state: BrokerLists, action: Action): BrokerLists {
  switch (action.type) {
    case "SEARCH_TERM_UPDATED":
      if (action.payload === "") {
        return {
          ...state,
          searchTerm: action.payload,
          brokerList: state.favorite,
          filteredBrokerList: remoteDataModule.initial(),
        };
      }
      return {
        ...state,
        searchTerm: action.payload,
        filteredBrokerList: remoteDataModule.pending(),
      };
    case "FILTERED_LOADED_SUCCESSFULLY":
      return {
        ...state,
        brokerList: action.payload,
        filteredBrokerList: remoteDataModule.success(action.payload),
      };
    case "FILTERED_FAILED_LOADING":
      return {
        ...state,
        filteredBrokerList: remoteDataModule.failure(action.payload),
      };
    case "BROKER_SELECTED":
      return {
        ...state,
        selectedBroker: action.payload,
      };
    default:
      state;
  }
  return state;
}

/**
 * manage the broker selection process
 */
export function useBrokerSelection(favorite: Array<brokersModule.Broker>) {
  const [state, dispatch] = useReducer(reducer, {
    favorite,
    selectedBroker: null,
    brokerList: favorite,
    searchTerm: "",
    filteredBrokerList: remoteDataModule.initial(),
  });

  function setSearchTerm(searchTerm: string) {
    dispatch({ type: "SEARCH_TERM_UPDATED", payload: searchTerm });
  }

  function setSelectedBroker(broker: brokersModule.Broker | null) {
    dispatch({ type: "BROKER_SELECTED", payload: broker });
  }

  const debouncedFilter = useCallback(
    debounce((searchTerm: string) => {
      brokerAPI
        .filter(searchTerm)
        .then((response) => {
          dispatch({
            type: "FILTERED_LOADED_SUCCESSFULLY",
            payload: response,
          });
        })
        .catch((error) => {
          dispatch({ type: "FILTERED_FAILED_LOADING", payload: error });
        });
    }, DEBOUNCE_DELAY),
    [],
  );

  useEffect(
    function queryFilter() {
      if (state.searchTerm !== "") {
        debouncedFilter(state.searchTerm);
      }
    },
    [state.selectedBroker, state.searchTerm, debouncedFilter],
  );

  return {
    searchTerm: state.searchTerm,
    brokerList: state.brokerList,
    selectedBroker: state.selectedBroker,
    setSelectedBroker,
    setSearchTerm,
    loadingState: remoteDataModule.getState(state.filteredBrokerList),
    error:
      remoteDataModule.isFailure(state.filteredBrokerList) &&
      state.filteredBrokerList.error,
  };
}
