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

type Props = {
  account: Account,
};

const SecurityAuditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function SecurityAudit({ account }: Props) {
  const { t } = useTranslation();

  console.log(account);
  return (
    <ScrollArea>
      <SecurityAuditContainer>
        <Text mt="40px" mb="24px" color="palette.text.shade100" ff="Inter|SemiBold" fontSize="24px">
          {t("account.privacy.title")}
        </Text>
        <GaugeChart id="gauge-chart1" />
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
