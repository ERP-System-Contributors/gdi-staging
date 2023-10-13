import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './report-content-type.reducer';

export const ReportContentTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reportContentTypeEntity = useAppSelector(state => state.reportContentType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reportContentTypeDetailsHeading">Report Content Type</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reportContentTypeEntity.id}</dd>
          <dt>
            <span id="reportTypeName">Report Type Name</span>
          </dt>
          <dd>{reportContentTypeEntity.reportTypeName}</dd>
          <dt>
            <span id="reportFileExtension">Report File Extension</span>
          </dt>
          <dd>{reportContentTypeEntity.reportFileExtension}</dd>
          <dt>System Content Type</dt>
          <dd>{reportContentTypeEntity.systemContentType ? reportContentTypeEntity.systemContentType.contentTypeName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {reportContentTypeEntity.placeholders
              ? reportContentTypeEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {reportContentTypeEntity.placeholders && i === reportContentTypeEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/report-content-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report-content-type/${reportContentTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReportContentTypeDetail;
