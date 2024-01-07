import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

import * as remoteDataModule from "../../infrastructure/utils/remoteData";

const SKELETON_HEIGHT = 56; // the height of the autocomplete, of course this is not robust

type Props<T> = {
  remoteData: remoteDataModule.RemoteData<string, T>;
  renderSuccess: (data: T) => JSX.Element;
  // could be extended for customizable initial, pending, failure state
};

/**
 * Consume a RemoteData structure to render 4 kind of components, provide the wrapped data on success
 * trought the renderSuccess props
 * @returns
 */
const RemoteDataViewer = <T,>({ remoteData, renderSuccess }: Props<T>) => {
  if (remoteDataModule.isInitial(remoteData)) {
    return null;
  } else if (remoteDataModule.isPending(remoteData)) {
    return <Skeleton variant="rounded" width="100%" height={SKELETON_HEIGHT} />;
  } else if (remoteDataModule.isSuccess(remoteData)) {
    return renderSuccess(remoteData.data);
  } else if (remoteDataModule.isFailure(remoteData)) {
    return <Alert severity="error">Error: {remoteData.error}</Alert>;
  }

  return null;
};

export default RemoteDataViewer;
