import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './agency-notice.reducer';

export const AgencyNoticeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const agencyNoticeEntity = useAppSelector(state => state.agencyNotice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agencyNoticeDetailsHeading">Agency Notice</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{agencyNoticeEntity.id}</dd>
          <dt>
            <span id="referenceNumber">Reference Number</span>
          </dt>
          <dd>{agencyNoticeEntity.referenceNumber}</dd>
          <dt>
            <span id="referenceDate">Reference Date</span>
          </dt>
          <dd>
            {agencyNoticeEntity.referenceDate ? (
              <TextFormat value={agencyNoticeEntity.referenceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="assessmentAmount">Assessment Amount</span>
          </dt>
          <dd>{agencyNoticeEntity.assessmentAmount}</dd>
          <dt>
            <span id="agencyStatus">Agency Status</span>
          </dt>
          <dd>{agencyNoticeEntity.agencyStatus}</dd>
          <dt>
            <span id="assessmentNotice">Assessment Notice</span>
          </dt>
          <dd>
            {agencyNoticeEntity.assessmentNotice ? (
              <div>
                {agencyNoticeEntity.assessmentNoticeContentType ? (
                  <a onClick={openFile(agencyNoticeEntity.assessmentNoticeContentType, agencyNoticeEntity.assessmentNotice)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {agencyNoticeEntity.assessmentNoticeContentType}, {byteSize(agencyNoticeEntity.assessmentNotice)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Correspondents</dt>
          <dd>
            {agencyNoticeEntity.correspondents
              ? agencyNoticeEntity.correspondents.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {agencyNoticeEntity.correspondents && i === agencyNoticeEntity.correspondents.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{agencyNoticeEntity.settlementCurrency ? agencyNoticeEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Assessor</dt>
          <dd>{agencyNoticeEntity.assessor ? agencyNoticeEntity.assessor.dealerName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {agencyNoticeEntity.placeholders
              ? agencyNoticeEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {agencyNoticeEntity.placeholders && i === agencyNoticeEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {agencyNoticeEntity.businessDocuments
              ? agencyNoticeEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {agencyNoticeEntity.businessDocuments && i === agencyNoticeEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/agency-notice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/agency-notice/${agencyNoticeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AgencyNoticeDetail;
