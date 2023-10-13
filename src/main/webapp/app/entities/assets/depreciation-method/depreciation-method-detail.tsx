import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-method.reducer';

export const DepreciationMethodDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationMethodEntity = useAppSelector(state => state.depreciationMethod.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationMethodDetailsHeading">Depreciation Method</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationMethodEntity.id}</dd>
          <dt>
            <span id="depreciationMethodName">Depreciation Method Name</span>
          </dt>
          <dd>{depreciationMethodEntity.depreciationMethodName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{depreciationMethodEntity.description}</dd>
          <dt>
            <span id="depreciationType">Depreciation Type</span>
          </dt>
          <dd>{depreciationMethodEntity.depreciationType}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{depreciationMethodEntity.remarks}</dd>
          <dt>Placeholder</dt>
          <dd>
            {depreciationMethodEntity.placeholders
              ? depreciationMethodEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {depreciationMethodEntity.placeholders && i === depreciationMethodEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/depreciation-method" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-method/${depreciationMethodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationMethodDetail;
