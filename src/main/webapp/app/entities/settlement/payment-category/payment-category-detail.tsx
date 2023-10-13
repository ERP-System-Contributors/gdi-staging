import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-category.reducer';

export const PaymentCategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentCategoryEntity = useAppSelector(state => state.paymentCategory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentCategoryDetailsHeading">Payment Category</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentCategoryEntity.id}</dd>
          <dt>
            <span id="categoryName">Category Name</span>
          </dt>
          <dd>{paymentCategoryEntity.categoryName}</dd>
          <dt>
            <span id="categoryDescription">Category Description</span>
          </dt>
          <dd>{paymentCategoryEntity.categoryDescription}</dd>
          <dt>
            <span id="categoryType">Category Type</span>
          </dt>
          <dd>{paymentCategoryEntity.categoryType}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentCategoryEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentCategoryEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {paymentCategoryEntity.paymentLabels
              ? paymentCategoryEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentCategoryEntity.paymentLabels && i === paymentCategoryEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentCategoryEntity.placeholders
              ? paymentCategoryEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentCategoryEntity.placeholders && i === paymentCategoryEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/payment-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-category/${paymentCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentCategoryDetail;
