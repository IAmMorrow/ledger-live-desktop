// @flow
import type Transport from "@ledgerhq/hw-transport";
import { Observable, from } from "rxjs";
import { withDevice } from "@ledgerhq/live-common/lib/hw/deviceAccess";

export type Result = {
  dataHex: string,
};

export const REVEALER_X = 159;
export const REVEALER_Y = 97;

export async function getImageWithTransport(transport: Transport<*>): Promise<Result> {
  let dataHex = "";
  for (let x = 0; x < REVEALER_X; x++) {
    dataHex += (await transport.send(0x80, 0xcb, x << 16, x & 0xff)).toString("hex");
  }
  return { dataHex };
}

type Input = {
  deviceId: string,
};

const cmd = ({ deviceId }: Input): Observable<Result> =>
  withDevice(deviceId)(t => from(getImageWithTransport(t)));

export default cmd;
