import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-batch-sequence.reducer';

export const DepreciationBatchSequenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationBatchSequenceEntity = useAppSelector(state => state.depreciationBatchSequence.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationBatchSequenceDetailsHeading">Depreciation Batch Sequence</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationBatchSequenceEntity.id}</dd>
          <dt>
            <span id="startIndex">Start Index</span>
          </dt>
          <dd>{depreciationBatchSequenceEntity.startIndex}</dd>
          <dt>
            <span id="endIndex">End Index</span>
          </dt>
          <dd>{depreciationBatchSequenceEntity.endIndex}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {depreciationBatchSequenceEntity.createdAt ? (
              <TextFormat value={depreciationBatchSequenceEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="depreciationBatchStatus">Depreciation Batch Status</span>
          </dt>
          <dd>{depreciationBatchSequenceEntity.depreciationBatchStatus}</dd>
          <dt>Depreciation Job</dt>
          <dd>{depreciationBatchSequenceEntity.depreciationJob ? depreciationBatchSequenceEntity.depreciationJob.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/depreciation-batch-sequence" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-batch-sequence/${depreciationBatchSequenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationBatchSequenceDetail;
