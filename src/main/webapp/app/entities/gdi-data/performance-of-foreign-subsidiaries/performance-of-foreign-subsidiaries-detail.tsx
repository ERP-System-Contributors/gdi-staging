import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './performance-of-foreign-subsidiaries.reducer';

export const PerformanceOfForeignSubsidiariesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const performanceOfForeignSubsidiariesEntity = useAppSelector(state => state.performanceOfForeignSubsidiaries.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="performanceOfForeignSubsidiariesDetailsHeading">Performance Of Foreign Subsidiaries</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.id}</dd>
          <dt>
            <span id="subsidiaryName">Subsidiary Name</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.subsidiaryName}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {performanceOfForeignSubsidiariesEntity.reportingDate ? (
              <TextFormat value={performanceOfForeignSubsidiariesEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="subsidiaryId">Subsidiary Id</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.subsidiaryId}</dd>
          <dt>
            <span id="grossLoansAmount">Gross Loans Amount</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.grossLoansAmount}</dd>
          <dt>
            <span id="grossNPALoanAmount">Gross NPA Loan Amount</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.grossNPALoanAmount}</dd>
          <dt>
            <span id="grossAssetsAmount">Gross Assets Amount</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.grossAssetsAmount}</dd>
          <dt>
            <span id="grossDepositsAmount">Gross Deposits Amount</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.grossDepositsAmount}</dd>
          <dt>
            <span id="profitBeforeTax">Profit Before Tax</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.profitBeforeTax}</dd>
          <dt>
            <span id="totalCapitalAdequacyRatio">Total Capital Adequacy Ratio</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.totalCapitalAdequacyRatio}</dd>
          <dt>
            <span id="liquidityRatio">Liquidity Ratio</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.liquidityRatio}</dd>
          <dt>
            <span id="generalProvisions">General Provisions</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.generalProvisions}</dd>
          <dt>
            <span id="specificProvisions">Specific Provisions</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.specificProvisions}</dd>
          <dt>
            <span id="interestInSuspenseAmount">Interest In Suspense Amount</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.interestInSuspenseAmount}</dd>
          <dt>
            <span id="totalNumberOfStaff">Total Number Of Staff</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.totalNumberOfStaff}</dd>
          <dt>
            <span id="numberOfBranches">Number Of Branches</span>
          </dt>
          <dd>{performanceOfForeignSubsidiariesEntity.numberOfBranches}</dd>
          <dt>Bank Code</dt>
          <dd>{performanceOfForeignSubsidiariesEntity.bankCode ? performanceOfForeignSubsidiariesEntity.bankCode.institutionName : ''}</dd>
          <dt>Subsidiary Country Code</dt>
          <dd>
            {performanceOfForeignSubsidiariesEntity.subsidiaryCountryCode
              ? performanceOfForeignSubsidiariesEntity.subsidiaryCountryCode.countryDescription
              : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/performance-of-foreign-subsidiaries" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button
          tag={Link}
          to={`/performance-of-foreign-subsidiaries/${performanceOfForeignSubsidiariesEntity.id}/edit`}
          replace
          color="primary"
        >
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PerformanceOfForeignSubsidiariesDetail;
