import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './string-question-base.reducer';

export const StringQuestionBaseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const stringQuestionBaseEntity = useAppSelector(state => state.stringQuestionBase.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="stringQuestionBaseDetailsHeading">String Question Base</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{stringQuestionBaseEntity.id}</dd>
          <dt>
            <span id="value">Value</span>
          </dt>
          <dd>{stringQuestionBaseEntity.value}</dd>
          <dt>
            <span id="key">Key</span>
          </dt>
          <dd>{stringQuestionBaseEntity.key}</dd>
          <dt>
            <span id="label">Label</span>
          </dt>
          <dd>{stringQuestionBaseEntity.label}</dd>
          <dt>
            <span id="required">Required</span>
          </dt>
          <dd>{stringQuestionBaseEntity.required ? 'true' : 'false'}</dd>
          <dt>
            <span id="order">Order</span>
          </dt>
          <dd>{stringQuestionBaseEntity.order}</dd>
          <dt>
            <span id="controlType">Control Type</span>
          </dt>
          <dd>{stringQuestionBaseEntity.controlType}</dd>
          <dt>
            <span id="placeholder">Placeholder</span>
          </dt>
          <dd>{stringQuestionBaseEntity.placeholder}</dd>
          <dt>
            <span id="iterable">Iterable</span>
          </dt>
          <dd>{stringQuestionBaseEntity.iterable ? 'true' : 'false'}</dd>
          <dt>Parameters</dt>
          <dd>
            {stringQuestionBaseEntity.parameters
              ? stringQuestionBaseEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {stringQuestionBaseEntity.parameters && i === stringQuestionBaseEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder Item</dt>
          <dd>
            {stringQuestionBaseEntity.placeholderItems
              ? stringQuestionBaseEntity.placeholderItems.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {stringQuestionBaseEntity.placeholderItems && i === stringQuestionBaseEntity.placeholderItems.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/string-question-base" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/string-question-base/${stringQuestionBaseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default StringQuestionBaseDetail;
