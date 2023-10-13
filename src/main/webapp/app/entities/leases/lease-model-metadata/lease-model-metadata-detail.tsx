import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './lease-model-metadata.reducer';

export const LeaseModelMetadataDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const leaseModelMetadataEntity = useAppSelector(state => state.leaseModelMetadata.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="leaseModelMetadataDetailsHeading">Lease Model Metadata</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{leaseModelMetadataEntity.id}</dd>
          <dt>
            <span id="modelTitle">Model Title</span>
          </dt>
          <dd>{leaseModelMetadataEntity.modelTitle}</dd>
          <dt>
            <span id="modelVersion">Model Version</span>
          </dt>
          <dd>{leaseModelMetadataEntity.modelVersion}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{leaseModelMetadataEntity.description}</dd>
          <dt>
            <span id="modelNotes">Model Notes</span>
          </dt>
          <dd>
            {leaseModelMetadataEntity.modelNotes ? (
              <div>
                {leaseModelMetadataEntity.modelNotesContentType ? (
                  <a onClick={openFile(leaseModelMetadataEntity.modelNotesContentType, leaseModelMetadataEntity.modelNotes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {leaseModelMetadataEntity.modelNotesContentType}, {byteSize(leaseModelMetadataEntity.modelNotes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="annualDiscountingRate">Annual Discounting Rate</span>
          </dt>
          <dd>{leaseModelMetadataEntity.annualDiscountingRate}</dd>
          <dt>
            <span id="commencementDate">Commencement Date</span>
          </dt>
          <dd>
            {leaseModelMetadataEntity.commencementDate ? (
              <TextFormat value={leaseModelMetadataEntity.commencementDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminalDate">Terminal Date</span>
          </dt>
          <dd>
            {leaseModelMetadataEntity.terminalDate ? (
              <TextFormat value={leaseModelMetadataEntity.terminalDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="totalReportingPeriods">Total Reporting Periods</span>
          </dt>
          <dd>{leaseModelMetadataEntity.totalReportingPeriods}</dd>
          <dt>
            <span id="reportingPeriodsPerYear">Reporting Periods Per Year</span>
          </dt>
          <dd>{leaseModelMetadataEntity.reportingPeriodsPerYear}</dd>
          <dt>
            <span id="settlementPeriodsPerYear">Settlement Periods Per Year</span>
          </dt>
          <dd>{leaseModelMetadataEntity.settlementPeriodsPerYear}</dd>
          <dt>
            <span id="initialLiabilityAmount">Initial Liability Amount</span>
          </dt>
          <dd>{leaseModelMetadataEntity.initialLiabilityAmount}</dd>
          <dt>
            <span id="initialROUAmount">Initial ROU Amount</span>
          </dt>
          <dd>{leaseModelMetadataEntity.initialROUAmount}</dd>
          <dt>
            <span id="totalDepreciationPeriods">Total Depreciation Periods</span>
          </dt>
          <dd>{leaseModelMetadataEntity.totalDepreciationPeriods}</dd>
          <dt>Placeholder</dt>
          <dd>
            {leaseModelMetadataEntity.placeholders
              ? leaseModelMetadataEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {leaseModelMetadataEntity.placeholders && i === leaseModelMetadataEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Lease Mapping</dt>
          <dd>
            {leaseModelMetadataEntity.leaseMappings
              ? leaseModelMetadataEntity.leaseMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {leaseModelMetadataEntity.leaseMappings && i === leaseModelMetadataEntity.leaseMappings.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Lease Contract</dt>
          <dd>{leaseModelMetadataEntity.leaseContract ? leaseModelMetadataEntity.leaseContract.bookingId : ''}</dd>
          <dt>Predecessor</dt>
          <dd>{leaseModelMetadataEntity.predecessor ? leaseModelMetadataEntity.predecessor.modelTitle : ''}</dd>
          <dt>Liability Currency</dt>
          <dd>{leaseModelMetadataEntity.liabilityCurrency ? leaseModelMetadataEntity.liabilityCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Rou Asset Currency</dt>
          <dd>{leaseModelMetadataEntity.rouAssetCurrency ? leaseModelMetadataEntity.rouAssetCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Model Attachments</dt>
          <dd>{leaseModelMetadataEntity.modelAttachments ? leaseModelMetadataEntity.modelAttachments.documentTitle : ''}</dd>
          <dt>Security Clearance</dt>
          <dd>{leaseModelMetadataEntity.securityClearance ? leaseModelMetadataEntity.securityClearance.clearanceLevel : ''}</dd>
          <dt>Lease Liability Account</dt>
          <dd>{leaseModelMetadataEntity.leaseLiabilityAccount ? leaseModelMetadataEntity.leaseLiabilityAccount.accountNumber : ''}</dd>
          <dt>Interest Payable Account</dt>
          <dd>{leaseModelMetadataEntity.interestPayableAccount ? leaseModelMetadataEntity.interestPayableAccount.accountNumber : ''}</dd>
          <dt>Interest Expense Account</dt>
          <dd>{leaseModelMetadataEntity.interestExpenseAccount ? leaseModelMetadataEntity.interestExpenseAccount.accountNumber : ''}</dd>
          <dt>Rou Asset Account</dt>
          <dd>{leaseModelMetadataEntity.rouAssetAccount ? leaseModelMetadataEntity.rouAssetAccount.accountNumber : ''}</dd>
          <dt>Rou Depreciation Account</dt>
          <dd>{leaseModelMetadataEntity.rouDepreciationAccount ? leaseModelMetadataEntity.rouDepreciationAccount.accountNumber : ''}</dd>
          <dt>Accrued Depreciation Account</dt>
          <dd>
            {leaseModelMetadataEntity.accruedDepreciationAccount ? leaseModelMetadataEntity.accruedDepreciationAccount.accountNumber : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/lease-model-metadata" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lease-model-metadata/${leaseModelMetadataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LeaseModelMetadataDetail;
