// @flow

import React, { useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { useActor } from "@xstate/react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { Question } from "./screens/Question";
import { Result } from "./screens/Result";

const DURATION = 250;

const ScreenContainer = styled.div`
  text-align: center;
  position: relative;
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px 67px;

  &.screen-appear {
    opacity: 0;
  }

  &.screen-appear-active {
    opacity: 1;
    transition: opacity ${DURATION}ms ease-in;
  }

  &.screen-enter {
    opacity: 0;
  }

  &.screen-enter-active {
    opacity: 1;
    transition: opacity ${DURATION}ms ease-in;
  }

  &.screen-exit {
    display: none;
  }
`;

const QuizzContainer = styled.div`
  box-sizing: border-box;
  width: 680px;
  height: 480px;
  background-color: ${p => p.theme.colors.palette.background.default};
  display: flex;
  overflow: hidden;
`;

const screens = {
  question: Question,
  result: Result,
};

type QuizzProps = {
  actor: any,
};

function mergeMeta(meta) {
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key];

    Object.assign(acc, value);

    return acc;
  }, {});
}

export function Quizz({ actor }: QuizzProps) {
  const [state, sendEvent] = useActor(actor);

  const meta = mergeMeta(state.meta);
  const { t } = useTranslation();

  const CurrentScreen = screens[meta.UI];

  if (!CurrentScreen) {
    return null;
  }

  return (
    <QuizzContainer>
      <CSSTransition in classNames="screen" timeout={DURATION} key={state.value} appear>
        <ScreenContainer>
          <CurrentScreen t={t} sendEvent={sendEvent} meta={meta} state={state} />
        </ScreenContainer>
      </CSSTransition>
    </QuizzContainer>
  );
}
