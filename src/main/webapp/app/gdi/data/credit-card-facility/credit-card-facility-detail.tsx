import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './credit-card-facility.reducer';

export const CreditCardFacilityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const creditCardFacilityEntity = useAppSelector(state => state.creditCardFacility.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="creditCardFacilityDetailsHeading">Credit Card Facility</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{creditCardFacilityEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {creditCardFacilityEntity.reportingDate ? (
              <TextFormat value={creditCardFacilityEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="totalNumberOfActiveCreditCards">Total Number Of Active Credit Cards</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalNumberOfActiveCreditCards}</dd>
          <dt>
            <span id="totalCreditCardLimitsInCCY">Total Credit Card Limits In CCY</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalCreditCardLimitsInCCY}</dd>
          <dt>
            <span id="totalCreditCardLimitsInLCY">Total Credit Card Limits In LCY</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalCreditCardLimitsInLCY}</dd>
          <dt>
            <span id="totalCreditCardAmountUtilisedInCCY">Total Credit Card Amount Utilised In CCY</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalCreditCardAmountUtilisedInCCY}</dd>
          <dt>
            <span id="totalCreditCardAmountUtilisedInLcy">Total Credit Card Amount Utilised In Lcy</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalCreditCardAmountUtilisedInLcy}</dd>
          <dt>
            <span id="totalNPACreditCardAmountInFCY">Total NPA Credit Card Amount In FCY</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalNPACreditCardAmountInFCY}</dd>
          <dt>
            <span id="totalNPACreditCardAmountInLCY">Total NPA Credit Card Amount In LCY</span>
          </dt>
          <dd>{creditCardFacilityEntity.totalNPACreditCardAmountInLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{creditCardFacilityEntity.bankCode ? creditCardFacilityEntity.bankCode.institutionName : ''}</dd>
          <dt>Customer Category</dt>
          <dd>
            {creditCardFacilityEntity.customerCategory ? creditCardFacilityEntity.customerCategory.creditCardOwnershipCategoryType : ''}
          </dd>
          <dt>Currency Code</dt>
          <dd>{creditCardFacilityEntity.currencyCode ? creditCardFacilityEntity.currencyCode.alphabeticCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/credit-card-facility" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/credit-card-facility/${creditCardFacilityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CreditCardFacilityDetail;
