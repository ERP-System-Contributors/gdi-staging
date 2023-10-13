import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './question-base.reducer';

export const QuestionBaseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const questionBaseEntity = useAppSelector(state => state.questionBase.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="questionBaseDetailsHeading">Question Base</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{questionBaseEntity.id}</dd>
          <dt>
            <span id="context">Context</span>
          </dt>
          <dd>{questionBaseEntity.context}</dd>
          <dt>
            <span id="serial">Serial</span>
          </dt>
          <dd>{questionBaseEntity.serial}</dd>
          <dt>
            <span id="questionBaseValue">Question Base Value</span>
          </dt>
          <dd>{questionBaseEntity.questionBaseValue}</dd>
          <dt>
            <span id="questionBaseKey">Question Base Key</span>
          </dt>
          <dd>{questionBaseEntity.questionBaseKey}</dd>
          <dt>
            <span id="questionBaseLabel">Question Base Label</span>
          </dt>
          <dd>{questionBaseEntity.questionBaseLabel}</dd>
          <dt>
            <span id="required">Required</span>
          </dt>
          <dd>{questionBaseEntity.required ? 'true' : 'false'}</dd>
          <dt>
            <span id="order">Order</span>
          </dt>
          <dd>{questionBaseEntity.order}</dd>
          <dt>
            <span id="controlType">Control Type</span>
          </dt>
          <dd>{questionBaseEntity.controlType}</dd>
          <dt>
            <span id="placeholder">Placeholder</span>
          </dt>
          <dd>{questionBaseEntity.placeholder}</dd>
          <dt>
            <span id="iterable">Iterable</span>
          </dt>
          <dd>{questionBaseEntity.iterable ? 'true' : 'false'}</dd>
          <dt>Parameters</dt>
          <dd>
            {questionBaseEntity.parameters
              ? questionBaseEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {questionBaseEntity.parameters && i === questionBaseEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder Item</dt>
          <dd>
            {questionBaseEntity.placeholderItems
              ? questionBaseEntity.placeholderItems.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {questionBaseEntity.placeholderItems && i === questionBaseEntity.placeholderItems.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/question-base" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question-base/${questionBaseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuestionBaseDetail;
