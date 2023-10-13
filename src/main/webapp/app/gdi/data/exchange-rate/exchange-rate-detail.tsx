import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './exchange-rate.reducer';

export const ExchangeRateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const exchangeRateEntity = useAppSelector(state => state.exchangeRate.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="exchangeRateDetailsHeading">Exchange Rate</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{exchangeRateEntity.id}</dd>
          <dt>
            <span id="businessReportingDay">Business Reporting Day</span>
          </dt>
          <dd>
            {exchangeRateEntity.businessReportingDay ? (
              <TextFormat value={exchangeRateEntity.businessReportingDay} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="buyingRate">Buying Rate</span>
          </dt>
          <dd>{exchangeRateEntity.buyingRate}</dd>
          <dt>
            <span id="sellingRate">Selling Rate</span>
          </dt>
          <dd>{exchangeRateEntity.sellingRate}</dd>
          <dt>
            <span id="meanRate">Mean Rate</span>
          </dt>
          <dd>{exchangeRateEntity.meanRate}</dd>
          <dt>
            <span id="closingBidRate">Closing Bid Rate</span>
          </dt>
          <dd>{exchangeRateEntity.closingBidRate}</dd>
          <dt>
            <span id="closingOfferRate">Closing Offer Rate</span>
          </dt>
          <dd>{exchangeRateEntity.closingOfferRate}</dd>
          <dt>
            <span id="usdCrossRate">Usd Cross Rate</span>
          </dt>
          <dd>{exchangeRateEntity.usdCrossRate}</dd>
          <dt>Institution Code</dt>
          <dd>{exchangeRateEntity.institutionCode ? exchangeRateEntity.institutionCode.institutionName : ''}</dd>
          <dt>Currency Code</dt>
          <dd>{exchangeRateEntity.currencyCode ? exchangeRateEntity.currencyCode.alphabeticCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/exchange-rate" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/exchange-rate/${exchangeRateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExchangeRateDetail;
