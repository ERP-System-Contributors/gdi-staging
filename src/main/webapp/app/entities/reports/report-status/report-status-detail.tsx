import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './report-status.reducer';

export const ReportStatusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reportStatusEntity = useAppSelector(state => state.reportStatus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reportStatusDetailsHeading">Report Status</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reportStatusEntity.id}</dd>
          <dt>
            <span id="reportName">Report Name</span>
          </dt>
          <dd>{reportStatusEntity.reportName}</dd>
          <dt>
            <span id="reportId">Report Id</span>
          </dt>
          <dd>{reportStatusEntity.reportId}</dd>
          <dt>Placeholder</dt>
          <dd>
            {reportStatusEntity.placeholders
              ? reportStatusEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {reportStatusEntity.placeholders && i === reportStatusEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Process Status</dt>
          <dd>{reportStatusEntity.processStatus ? reportStatusEntity.processStatus.statusCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/report-status" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report-status/${reportStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReportStatusDetail;
