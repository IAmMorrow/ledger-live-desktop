// @flow
import styled from "styled-components";
import { delay } from "rxjs/operators";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Modal from "~/renderer/components/Modal";
import Button from "~/renderer/components/Button";
import ReactDOMServer from "react-dom/server";
import { Sheet } from "~/renderer/modals/Revealer/Sheet";
import { command } from "~/renderer/commands";
import DeviceAction from "~/renderer/components/DeviceAction";
import { createAction } from "@ledgerhq/live-common/lib/hw/actions/app";
import { getEnv } from "@ledgerhq/live-common/lib/env";
import { mockedEventEmitter } from "~/renderer/components/DebugMock";

const connectAppExec = command("connectApp");
const action = createAction(getEnv("MOCK") ? mockedEventEmitter : connectAppExec);

const { BrowserWindow } = require("electron").remote;

const REVEALER_X = 159;
const REVEALER_Y = 97;

function setPixel(imageData, x, y, color) {
  const { r, g, b, a } = color;
  const index = 4 * (x + y * imageData.width);

  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a || 255;
}

function renderData(imageData, x, y, value) {
  const offsetX = x * 2;
  const offsetY = y * 2;
  if (value === 0) {
    setPixel(imageData, offsetX, offsetY, { r: 0, g: 0, b: 0 });
    setPixel(imageData, offsetX + 1, offsetY, { r: 255, g: 255, b: 255 });
    setPixel(imageData, offsetX, offsetY + 1, { r: 255, g: 255, b: 255 });
    setPixel(imageData, offsetX + 1, offsetY + 1, { r: 0, g: 0, b: 0 });
  } else {
    setPixel(imageData, offsetX, offsetY, { r: 255, g: 255, b: 255 });
    setPixel(imageData, offsetX + 1, offsetY, { r: 0, g: 0, b: 0 });
    setPixel(imageData, offsetX, offsetY + 1, { r: 0, g: 0, b: 0 });
    setPixel(imageData, offsetX + 1, offsetY + 1, { r: 255, g: 255, b: 255 });
  }
}

const RevealerContainer = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RevealerCardFrame = styled.div`
  display: flex;
  padding: 0.2cm;
  background-color: white;
  border: black 0.025cm solid;
`;

const RevealerCardContainer = styled.div`
  display: flex;
  border: black 0.025cm solid;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.2cm;
  border-bottom-right-radius: 10%;
  background-color: white;
`;

const RevealerCard = styled.canvas`
  image-rendering: pixelated;
  width: 8.1cm;
  height: 4.9cm;
`;

const printOptions = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: "none",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
};

function Display({ data, onClose }: { data: string, onClose: * }) {
  const revealer = useRef();

  const handlePrint = useCallback(() => {
    const dataUrl = revealer.current.toDataURL();

    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

    const html = ReactDOMServer.renderToString(<Sheet imgData={dataUrl} />);

    win.once("ready-to-show", () => {
      console.log("printing now");
      win.webContents.print(printOptions, (success, errorType) => {
        if (!success) console.log(errorType);
        win.destroy();
      });
    });

    win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  }, []);

  useEffect(() => {
    const context = revealer.current.getContext("2d");
    const secretArea = context.createImageData(REVEALER_X * 2, REVEALER_Y * 2);
    for (let i = 0; i < data.length; i += 2) {
      const x = Math.floor(i / REVEALER_X);
      const y = i - x;
      const value = data.slice(i, 2);
      renderData(secretArea, x, y, value === "01" ? 1 : 0);
    }
    context.putImageData(secretArea, 0, 0);
  }, [data]);

  return (
    <RevealerContainer>
      <RevealerCardFrame>
        <RevealerCardContainer>
          <LogoContainer />
          <RevealerCard width={REVEALER_X * 2} height={REVEALER_Y * 2} ref={revealer} />
        </RevealerCardContainer>
      </RevealerCardFrame>
      <Button onClick={handlePrint}>print</Button>
    </RevealerContainer>
  );
}

function DeviceReady({ onClose }) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data && !error) return;
    const sub = command("revealerGetImage")({ deviceId: "" })
      .pipe(delay(1000)) // delay polling to not poll spam too much
      .subscribe(d => setData(d.dataHex), setError);
    return () => sub.unsubscribe();
  }, [error, data]);

  if (!data) {
    return <h1>Please follow device instructions</h1>;
  }

  return <Display data={data} onClose={onClose} />;
}

function Revealer({ onClose }: *) {
  const [connected, setConnected] = useState(false);
  if (!connected) {
    return (
      <DeviceAction action={action} request={{ appName: "Revealer" }} onResult={setConnected} />
    );
  }
  return <DeviceReady onClose={onClose} />;
}

const RevealerModal = () => (
  <Modal
    name="MODAL_REVEALER"
    centered
    render={({ data, onClose }) => <Revealer onClose={onClose} />}
  />
);

export default RevealerModal;
