import { HTMLAttributes, JSXElementConstructor, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import * as brokersModule from "../../../domain/broker";
import { useBrokerSelection } from "./useBrokerSelection";
import { BrokerCreationDialog } from "./BrokerCreationDialog";

type BrokerSelectionProps = {
  initialList: Array<brokersModule.Broker>;
  onChange: (broker: brokersModule.Broker | null) => void;
};

function getOptionLabel(option: brokersModule.Broker) {
  return brokersModule.toString(option);
}

const CustomPaperComponent:
  | JSXElementConstructor<HTMLAttributes<HTMLElement>>
  | undefined = ({ children, onMouseDown, ...rest }) => {
  return (
    <Paper {...rest}>
      {children}
      <Stack
        spacing={1}
        paddingInline={1}
        direction="row"
        alignItems="baseline"
      >
        <Typography>or</Typography>
        <Button
          variant="text"
          color="info"
          sx={{ textDecoration: "underline", textTransform: "none" }}
          onMouseDown={onMouseDown}
        >
          Add Manually
        </Button>
      </Stack>
    </Paper>
  );
};

export function BrokerAutocomplete({
  initialList,
  onChange,
}: BrokerSelectionProps) {
  const {
    brokerList,
    searchTerm,
    selectedBroker,
    setSelectedBroker,
    setSearchTerm,
    loadingState,
    error,
  } = useBrokerSelection(initialList);
  const [creationModalOpen, setCreationModalOpen] = useState(false);

  const onLocalChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: brokersModule.Broker | null,
  ) => {
    setSelectedBroker(newValue);
    onChange(newValue);
  };

  const updateSearchTerm = (
    _: React.SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setSearchTerm(newInputValue);
  };

  const openCreationModal = () => {
    setCreationModalOpen(true);
  };

  const closeCreationModal = () => {
    setCreationModalOpen(false);
  };

  const handleBrokerCreation = (broker: brokersModule.Broker) => {
    setSelectedBroker(broker);
    onChange(broker);
  };

  return (
    <>
      <Autocomplete
        id="broker-selection"
        options={brokerList}
        getOptionLabel={getOptionLabel}
        value={selectedBroker}
        onChange={onLocalChange}
        inputValue={searchTerm}
        onInputChange={updateSearchTerm}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Broker"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {error && <Alert severity="error">Error: {error}</Alert>}
                    {loadingState === "Pending" && selectedBroker === null ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
        renderOption={(props, option) => {
          return <li {...props}>{brokersModule.toString(option)}</li>;
        }}
        loading={loadingState === "Pending"}
        popupIcon={selectedBroker ? null : <SearchIcon />}
        sx={{
          width: "100%",
          ".MuiAutocomplete-popupIndicator": { transform: "rotate(0)" }, // we don't want the popup icon to rotate when open
        }}
        componentsProps={{ paper: { onMouseDown: openCreationModal } }}
        PaperComponent={CustomPaperComponent}
      />
      <BrokerCreationDialog
        open={creationModalOpen}
        onClose={closeCreationModal}
        created={handleBrokerCreation}
      />
    </>
  );
}
