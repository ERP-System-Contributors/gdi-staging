import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-job.reducer';

export const DepreciationJobDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationJobEntity = useAppSelector(state => state.depreciationJob.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationJobDetailsHeading">Depreciation Job</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationJobEntity.id}</dd>
          <dt>
            <span id="timeOfCommencement">Time Of Commencement</span>
          </dt>
          <dd>
            {depreciationJobEntity.timeOfCommencement ? (
              <TextFormat value={depreciationJobEntity.timeOfCommencement} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="depreciationJobStatus">Depreciation Job Status</span>
          </dt>
          <dd>{depreciationJobEntity.depreciationJobStatus}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{depreciationJobEntity.description}</dd>
          <dt>Created By</dt>
          <dd>{depreciationJobEntity.createdBy ? depreciationJobEntity.createdBy.designation : ''}</dd>
          <dt>Depreciation Period</dt>
          <dd>{depreciationJobEntity.depreciationPeriod ? depreciationJobEntity.depreciationPeriod.endDate : ''}</dd>
        </dl>
        <Button tag={Link} to="/depreciation-job" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-job/${depreciationJobEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationJobDetail;
