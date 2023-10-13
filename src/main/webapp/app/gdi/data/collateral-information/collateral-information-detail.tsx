import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './collateral-information.reducer';

export const CollateralInformationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const collateralInformationEntity = useAppSelector(state => state.collateralInformation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="collateralInformationDetailsHeading">Collateral Information</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{collateralInformationEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {collateralInformationEntity.reportingDate ? (
              <TextFormat value={collateralInformationEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="collateralId">Collateral Id</span>
          </dt>
          <dd>{collateralInformationEntity.collateralId}</dd>
          <dt>
            <span id="loanContractId">Loan Contract Id</span>
          </dt>
          <dd>{collateralInformationEntity.loanContractId}</dd>
          <dt>
            <span id="customerId">Customer Id</span>
          </dt>
          <dd>{collateralInformationEntity.customerId}</dd>
          <dt>
            <span id="registrationPropertyNumber">Registration Property Number</span>
          </dt>
          <dd>{collateralInformationEntity.registrationPropertyNumber}</dd>
          <dt>
            <span id="collateralOMVInCCY">Collateral OMV In CCY</span>
          </dt>
          <dd>{collateralInformationEntity.collateralOMVInCCY}</dd>
          <dt>
            <span id="collateralFSVInLCY">Collateral FSV In LCY</span>
          </dt>
          <dd>{collateralInformationEntity.collateralFSVInLCY}</dd>
          <dt>
            <span id="collateralDiscountedValue">Collateral Discounted Value</span>
          </dt>
          <dd>{collateralInformationEntity.collateralDiscountedValue}</dd>
          <dt>
            <span id="amountCharged">Amount Charged</span>
          </dt>
          <dd>{collateralInformationEntity.amountCharged}</dd>
          <dt>
            <span id="collateralDiscountRate">Collateral Discount Rate</span>
          </dt>
          <dd>{collateralInformationEntity.collateralDiscountRate}</dd>
          <dt>
            <span id="loanToValueRatio">Loan To Value Ratio</span>
          </dt>
          <dd>{collateralInformationEntity.loanToValueRatio}</dd>
          <dt>
            <span id="nameOfPropertyValuer">Name Of Property Valuer</span>
          </dt>
          <dd>{collateralInformationEntity.nameOfPropertyValuer}</dd>
          <dt>
            <span id="collateralLastValuationDate">Collateral Last Valuation Date</span>
          </dt>
          <dd>
            {collateralInformationEntity.collateralLastValuationDate ? (
              <TextFormat value={collateralInformationEntity.collateralLastValuationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="insuredFlag">Insured Flag</span>
          </dt>
          <dd>{collateralInformationEntity.insuredFlag}</dd>
          <dt>
            <span id="nameOfInsurer">Name Of Insurer</span>
          </dt>
          <dd>{collateralInformationEntity.nameOfInsurer}</dd>
          <dt>
            <span id="amountInsured">Amount Insured</span>
          </dt>
          <dd>{collateralInformationEntity.amountInsured}</dd>
          <dt>
            <span id="insuranceExpiryDate">Insurance Expiry Date</span>
          </dt>
          <dd>
            {collateralInformationEntity.insuranceExpiryDate ? (
              <TextFormat value={collateralInformationEntity.insuranceExpiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="guaranteeInsurers">Guarantee Insurers</span>
          </dt>
          <dd>{collateralInformationEntity.guaranteeInsurers}</dd>
          <dt>Bank Code</dt>
          <dd>{collateralInformationEntity.bankCode ? collateralInformationEntity.bankCode.institutionName : ''}</dd>
          <dt>Branch Code</dt>
          <dd>{collateralInformationEntity.branchCode ? collateralInformationEntity.branchCode.branchCode : ''}</dd>
          <dt>Collateral Type</dt>
          <dd>{collateralInformationEntity.collateralType ? collateralInformationEntity.collateralType.collateralType : ''}</dd>
          <dt>County Code</dt>
          <dd>{collateralInformationEntity.countyCode ? collateralInformationEntity.countyCode.subCountyName : ''}</dd>
        </dl>
        <Button tag={Link} to="/collateral-information" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/collateral-information/${collateralInformationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CollateralInformationDetail;
