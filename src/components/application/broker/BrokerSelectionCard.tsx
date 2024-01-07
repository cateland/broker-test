import { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useBrokerFavoriteList } from "./useBrokerSelection";
import RemoteDataViewer from "../../utils/RemoteDataViewer";
import { BrokerAutocomplete } from "./BrokerAutocomplete";
import * as brokerModule from "../../../domain/broker";

import "./BrokerSelectionCard.css";

export function BrokerSelectionCard() {
  const { favoriteList } = useBrokerFavoriteList();
  const [selectedBroker, setSelectedBroker] =
    useState<brokerModule.Broker | null>(null);
  function onChange(broker: brokerModule.Broker | null) {
    setSelectedBroker(broker);
  }

  return (
    <Card>
      <CardContent component="fieldset">
        <Stack spacing={2}>
          <Stack spacing={0}>
            <Typography variant="h5" component="legend">
              Managing Broker
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <RemoteDataViewer
              remoteData={favoriteList}
              renderSuccess={(brokerLists) => {
                return (
                  <BrokerAutocomplete
                    initialList={brokerLists}
                    onChange={onChange}
                  />
                );
              }}
            />
            {selectedBroker && (
              <>
                <div>
                  <Typography variant="caption">Adress</Typography>
                  <Typography>
                    {brokerModule.completeAdress(selectedBroker)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption">Country</Typography>
                  <Typography>{selectedBroker.country}</Typography>
                </div>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="broker-contact-selection"
                    color="secondary"
                    shrink={true}
                  >
                    Contact
                  </InputLabel>
                  <Select
                    labelId="broker-contact-selection"
                    value=""
                    label="Contact"
                    notched={true}
                  ></Select>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="broker-comission" shrink={true}>
                    Commission
                  </InputLabel>
                  <OutlinedInput
                    id="broker-commission"
                    label="Commission"
                    notched={true}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                  />
                </FormControl>
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
