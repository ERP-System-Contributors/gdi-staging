import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-job-notice.reducer';

export const DepreciationJobNoticeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationJobNoticeEntity = useAppSelector(state => state.depreciationJobNotice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationJobNoticeDetailsHeading">Depreciation Job Notice</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.id}</dd>
          <dt>
            <span id="eventNarrative">Event Narrative</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.eventNarrative}</dd>
          <dt>
            <span id="eventTimeStamp">Event Time Stamp</span>
          </dt>
          <dd>
            {depreciationJobNoticeEntity.eventTimeStamp ? (
              <TextFormat value={depreciationJobNoticeEntity.eventTimeStamp} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="depreciationNoticeStatus">Depreciation Notice Status</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.depreciationNoticeStatus}</dd>
          <dt>
            <span id="sourceModule">Source Module</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.sourceModule}</dd>
          <dt>
            <span id="sourceEntity">Source Entity</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.sourceEntity}</dd>
          <dt>
            <span id="errorCode">Error Code</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.errorCode}</dd>
          <dt>
            <span id="errorMessage">Error Message</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.errorMessage}</dd>
          <dt>
            <span id="userAction">User Action</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.userAction}</dd>
          <dt>
            <span id="technicalDetails">Technical Details</span>
          </dt>
          <dd>{depreciationJobNoticeEntity.technicalDetails}</dd>
          <dt>Depreciation Job</dt>
          <dd>{depreciationJobNoticeEntity.depreciationJob ? depreciationJobNoticeEntity.depreciationJob.id : ''}</dd>
          <dt>Depreciation Batch Sequence</dt>
          <dd>{depreciationJobNoticeEntity.depreciationBatchSequence ? depreciationJobNoticeEntity.depreciationBatchSequence.id : ''}</dd>
          <dt>Depreciation Period</dt>
          <dd>{depreciationJobNoticeEntity.depreciationPeriod ? depreciationJobNoticeEntity.depreciationPeriod.id : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {depreciationJobNoticeEntity.placeholders
              ? depreciationJobNoticeEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {depreciationJobNoticeEntity.placeholders && i === depreciationJobNoticeEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {depreciationJobNoticeEntity.universallyUniqueMappings
              ? depreciationJobNoticeEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {depreciationJobNoticeEntity.universallyUniqueMappings &&
                    i === depreciationJobNoticeEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Superintended</dt>
          <dd>{depreciationJobNoticeEntity.superintended ? depreciationJobNoticeEntity.superintended.applicationIdentity : ''}</dd>
        </dl>
        <Button tag={Link} to="/depreciation-job-notice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-job-notice/${depreciationJobNoticeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationJobNoticeDetail;
