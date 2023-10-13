import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-label.reducer';

export const PaymentLabelDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentLabelEntity = useAppSelector(state => state.paymentLabel.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentLabelDetailsHeading">Payment Label</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentLabelEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{paymentLabelEntity.description}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>{paymentLabelEntity.comments}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentLabelEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentLabelEntity.compilationToken}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{paymentLabelEntity.remarks}</dd>
          <dt>Containing Payment Label</dt>
          <dd>{paymentLabelEntity.containingPaymentLabel ? paymentLabelEntity.containingPaymentLabel.description : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentLabelEntity.placeholders
              ? paymentLabelEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentLabelEntity.placeholders && i === paymentLabelEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/payment-label" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-label/${paymentLabelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentLabelDetail;
