import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './work-in-progress-transfer.reducer';

export const WorkInProgressTransferDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const workInProgressTransferEntity = useAppSelector(state => state.workInProgressTransfer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workInProgressTransferDetailsHeading">Work In Progress Transfer</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{workInProgressTransferEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{workInProgressTransferEntity.description}</dd>
          <dt>
            <span id="targetAssetNumber">Target Asset Number</span>
          </dt>
          <dd>{workInProgressTransferEntity.targetAssetNumber}</dd>
          <dt>Work In Progress Registration</dt>
          <dd>
            {workInProgressTransferEntity.workInProgressRegistrations
              ? workInProgressTransferEntity.workInProgressRegistrations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {workInProgressTransferEntity.workInProgressRegistrations &&
                    i === workInProgressTransferEntity.workInProgressRegistrations.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {workInProgressTransferEntity.placeholders
              ? workInProgressTransferEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {workInProgressTransferEntity.placeholders && i === workInProgressTransferEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {workInProgressTransferEntity.businessDocuments
              ? workInProgressTransferEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {workInProgressTransferEntity.businessDocuments && i === workInProgressTransferEntity.businessDocuments.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/work-in-progress-transfer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-in-progress-transfer/${workInProgressTransferEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkInProgressTransferDetail;
