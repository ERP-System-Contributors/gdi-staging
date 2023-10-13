import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './job-sheet.reducer';

export const JobSheetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const jobSheetEntity = useAppSelector(state => state.jobSheet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobSheetDetailsHeading">Job Sheet</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{jobSheetEntity.id}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{jobSheetEntity.serialNumber}</dd>
          <dt>
            <span id="jobSheetDate">Job Sheet Date</span>
          </dt>
          <dd>
            {jobSheetEntity.jobSheetDate ? (
              <TextFormat value={jobSheetEntity.jobSheetDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>{jobSheetEntity.details}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{jobSheetEntity.remarks}</dd>
          <dt>Biller</dt>
          <dd>{jobSheetEntity.biller ? jobSheetEntity.biller.dealerName : ''}</dd>
          <dt>Signatories</dt>
          <dd>
            {jobSheetEntity.signatories
              ? jobSheetEntity.signatories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {jobSheetEntity.signatories && i === jobSheetEntity.signatories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Contact Person</dt>
          <dd>{jobSheetEntity.contactPerson ? jobSheetEntity.contactPerson.dealerName : ''}</dd>
          <dt>Business Stamps</dt>
          <dd>
            {jobSheetEntity.businessStamps
              ? jobSheetEntity.businessStamps.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.details}</a>
                    {jobSheetEntity.businessStamps && i === jobSheetEntity.businessStamps.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {jobSheetEntity.placeholders
              ? jobSheetEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {jobSheetEntity.placeholders && i === jobSheetEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Label</dt>
          <dd>
            {jobSheetEntity.paymentLabels
              ? jobSheetEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {jobSheetEntity.paymentLabels && i === jobSheetEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {jobSheetEntity.businessDocuments
              ? jobSheetEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {jobSheetEntity.businessDocuments && i === jobSheetEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/job-sheet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-sheet/${jobSheetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default JobSheetDetail;
