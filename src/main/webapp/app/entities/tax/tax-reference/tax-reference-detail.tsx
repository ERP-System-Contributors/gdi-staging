import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tax-reference.reducer';

export const TaxReferenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taxReferenceEntity = useAppSelector(state => state.taxReference.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taxReferenceDetailsHeading">Tax Reference</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{taxReferenceEntity.id}</dd>
          <dt>
            <span id="taxName">Tax Name</span>
          </dt>
          <dd>{taxReferenceEntity.taxName}</dd>
          <dt>
            <span id="taxDescription">Tax Description</span>
          </dt>
          <dd>{taxReferenceEntity.taxDescription}</dd>
          <dt>
            <span id="taxPercentage">Tax Percentage</span>
          </dt>
          <dd>{taxReferenceEntity.taxPercentage}</dd>
          <dt>
            <span id="taxReferenceType">Tax Reference Type</span>
          </dt>
          <dd>{taxReferenceEntity.taxReferenceType}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{taxReferenceEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{taxReferenceEntity.compilationToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {taxReferenceEntity.placeholders
              ? taxReferenceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {taxReferenceEntity.placeholders && i === taxReferenceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/tax-reference" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tax-reference/${taxReferenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaxReferenceDetail;
