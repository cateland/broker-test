import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Control, Controller } from "react-hook-form";

type FormInputTextprops = {
  name: string;
  // not sure yet how to fix type below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  id: string;
  required?: boolean;
};

export function FormInputText({
  name,
  control,
  label,
  id,
  required,
}: FormInputTextprops) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required ? `${label} is required` : undefined }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <OutlinedInput
            value={value}
            onChange={onChange}
            error={!!error}
            id={id}
            label={label}
            notched={true}
          />
          {!!error && (
            <FormHelperText error={true}>{error.message}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
