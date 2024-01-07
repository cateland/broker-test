import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import { FormInputText } from "../../forms/FormInputText";
import * as brokerModule from "../../../domain/broker";

type BrokerCreationDialog = {
  open: boolean;
  onClose: () => void;
  created: (broker: brokerModule.Broker) => void;
};

export function BrokerCreationDialog({
  open,
  onClose,
  created,
}: BrokerCreationDialog) {
  const { control, handleSubmit, reset } = useForm<brokerModule.Broker>();

  const onSubmit = handleSubmit((data) => {
    created(brokerModule.createBroker(data));
    reset();
    onClose();
  });

  return (
    <Dialog
      open={open}
      component="form"
      onClose={onClose}
      onSubmit={onSubmit}
      fullWidth={true}
      aria-labelledby="broker-creation-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="broker-creation-dialog-title">Add manually</DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingBlockStart={2}>
          <FormControl autoFocus>
            <InputLabel htmlFor="broker-creation-legal-name" shrink={true}>
              Legal name
            </InputLabel>
            <FormInputText
              name="legalName"
              control={control}
              label="Legal name"
              id="broker-creation-legal-name"
              required={true}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="broker-creation-address" shrink={true}>
              Address
            </InputLabel>
            <FormInputText
              name="address"
              control={control}
              label="Address"
              id="broker-creation-address"
              required={true}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="broker-creation-city" shrink={true}>
              City
            </InputLabel>
            <FormInputText
              name="city"
              control={control}
              label="City"
              id="broker-creation-city"
              required={true}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="broker-creation-country" shrink={true}>
              Country
            </InputLabel>
            <FormInputText
              name="country"
              control={control}
              label="Country"
              id="broker-creation-country"
              required={true}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
