// @flow
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "~/renderer/components/Modal";
import ModalBody from "~/renderer/components/Modal/ModalBody";
import type { Account } from "@ledgerhq/live-common/lib/types/account";
import GaugeChart from "react-gauge-chart";
import { ScrollArea } from "~/renderer/components/Onboarding/ScrollArea";
import Text from "~/renderer/components/Text";
import { useTranslation } from "react-i18next";
import IconCheck from "~/renderer/icons/Check";
import IconCross from "~/renderer/icons/Cross";
import { DataList } from "~/renderer/modals/OperationDetails";

type Props = {
  account: Account,
};

const SecurityAuditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeuristicContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const IconContainer = styled.div`
  color: ${p => (p.bad ? p.theme.colors.alertRed : p.theme.colors.positiveGreen)};
  margin-right: 6px;
  display: inline-flex;
`;

function HeuristicReport({ account, report, t }) {
  const bad = report.penalty > 0;

  return (
    <HeuristicContainer>
      <Text color="palette.text.shade100" ff="Inter|SemiBold" fontSize="15px" lineHeight="20px">
        <IconContainer bad={bad}>
          {bad ? <IconCross size={15} color="" /> : <IconCheck size={15} />}
        </IconContainer>
        {t(`account.privacy.heuristics.${report.heuristicId}.name`)}
      </Text>
      <Text
        mt="6px"
        mb="8px"
        color="palette.text.shade90"
        ff="Inter|Regular"
        fontSize="12px"
        lineHeight="18px"
      >
        {t(`account.privacy.heuristics.${report.heuristicId}.${bad ? "descBad" : "descGood"}`)}
      </Text>
      {report.operations.length ? (
        <React.Fragment>
          <Text
            mb="6px"
            color="palette.text.shade100"
            ff="Inter|SemiBold"
            fontSize="12px"
            lineHeight="18px"
          >
            {t(`account.privacy.operations`)}
          </Text>
          <DataList lines={report.operations.map(operation => operation.hash)} t={t} />
        </React.Fragment>
      ) : null}
    </HeuristicContainer>
  );
}

const ReportContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function SecurityAudit({ account }: Props) {
  const { t } = useTranslation();

  const { privacyReport } = account.bitcoinResources;

  const formatGaugeValue = useCallback(value => {
    if (value <= 33) {
      return "Basic";
    } else if (value <= 66) {
      return "Intermediate";
    } else {
      return "Excellent";
    }
  }, []);

  return (
    <ScrollArea withHint>
      <SecurityAuditContainer>
        <Text mt="40px" mb="24px" color="palette.text.shade100" ff="Inter|SemiBold" fontSize="22px">
          {t("account.privacy.title")}
        </Text>
        <GaugeChart
          id="gauge-chart1"
          animate
          percent={0.8}
          colors={["#FF0D0D", "#FAB733", "#69B34C"]}
          formatTextValue={formatGaugeValue}
        />
        <ReportContainer>
          {privacyReport.reports.map(report => (
            <HeuristicReport key={report.heuristicId} account={account} t={t} report={report} />
          ))}
        </ReportContainer>
      </SecurityAuditContainer>
    </ScrollArea>
  );
}

const SecurityAuditModal = () => {
  return (
    <Modal
      name="MODAL_SECURITY_AUDIT"
      centered
      render={({ data, onClose }) => (
        <ModalBody
          onClose={onClose}
          title="Security Audit"
          render={() => <SecurityAudit account={data.account} />}
        />
      )}
    />
  );
};

export default SecurityAuditModal;
