import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './card-issuer-charges.reducer';

export const CardIssuerChargesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cardIssuerChargesEntity = useAppSelector(state => state.cardIssuerCharges.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cardIssuerChargesDetailsHeading">Card Issuer Charges</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cardIssuerChargesEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {cardIssuerChargesEntity.reportingDate ? (
              <TextFormat value={cardIssuerChargesEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="cardFeeChargeInLCY">Card Fee Charge In LCY</span>
          </dt>
          <dd>{cardIssuerChargesEntity.cardFeeChargeInLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{cardIssuerChargesEntity.bankCode ? cardIssuerChargesEntity.bankCode.institutionName : ''}</dd>
          <dt>Card Category</dt>
          <dd>{cardIssuerChargesEntity.cardCategory ? cardIssuerChargesEntity.cardCategory.cardCategoryDescription : ''}</dd>
          <dt>Card Type</dt>
          <dd>{cardIssuerChargesEntity.cardType ? cardIssuerChargesEntity.cardType.cardType : ''}</dd>
          <dt>Card Brand</dt>
          <dd>{cardIssuerChargesEntity.cardBrand ? cardIssuerChargesEntity.cardBrand.cardBrandType : ''}</dd>
          <dt>Card Class</dt>
          <dd>{cardIssuerChargesEntity.cardClass ? cardIssuerChargesEntity.cardClass.cardClassType : ''}</dd>
          <dt>Card Charge Type</dt>
          <dd>{cardIssuerChargesEntity.cardChargeType ? cardIssuerChargesEntity.cardChargeType.cardChargeTypeName : ''}</dd>
        </dl>
        <Button tag={Link} to="/card-issuer-charges" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card-issuer-charges/${cardIssuerChargesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CardIssuerChargesDetail;
