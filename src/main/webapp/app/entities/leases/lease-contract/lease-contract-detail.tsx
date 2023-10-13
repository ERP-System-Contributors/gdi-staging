import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './lease-contract.reducer';

export const LeaseContractDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const leaseContractEntity = useAppSelector(state => state.leaseContract.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="leaseContractDetailsHeading">Lease Contract</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{leaseContractEntity.id}</dd>
          <dt>
            <span id="bookingId">Booking Id</span>
          </dt>
          <dd>{leaseContractEntity.bookingId}</dd>
          <dt>
            <span id="leaseTitle">Lease Title</span>
          </dt>
          <dd>{leaseContractEntity.leaseTitle}</dd>
          <dt>
            <span id="identifier">Identifier</span>
          </dt>
          <dd>{leaseContractEntity.identifier}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{leaseContractEntity.description}</dd>
          <dt>
            <span id="commencementDate">Commencement Date</span>
          </dt>
          <dd>
            {leaseContractEntity.commencementDate ? (
              <TextFormat value={leaseContractEntity.commencementDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminalDate">Terminal Date</span>
          </dt>
          <dd>
            {leaseContractEntity.terminalDate ? (
              <TextFormat value={leaseContractEntity.terminalDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {leaseContractEntity.placeholders
              ? leaseContractEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {leaseContractEntity.placeholders && i === leaseContractEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>System Mappings</dt>
          <dd>
            {leaseContractEntity.systemMappings
              ? leaseContractEntity.systemMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {leaseContractEntity.systemMappings && i === leaseContractEntity.systemMappings.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {leaseContractEntity.businessDocuments
              ? leaseContractEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {leaseContractEntity.businessDocuments && i === leaseContractEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Contract Metadata</dt>
          <dd>
            {leaseContractEntity.contractMetadata
              ? leaseContractEntity.contractMetadata.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.contractTitle}</a>
                    {leaseContractEntity.contractMetadata && i === leaseContractEntity.contractMetadata.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/lease-contract" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lease-contract/${leaseContractEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LeaseContractDetail;
