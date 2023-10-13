import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tax-rule.reducer';

export const TaxRuleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taxRuleEntity = useAppSelector(state => state.taxRule.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taxRuleDetailsHeading">Tax Rule</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{taxRuleEntity.id}</dd>
          <dt>
            <span id="telcoExciseDuty">Telco Excise Duty</span>
          </dt>
          <dd>{taxRuleEntity.telcoExciseDuty}</dd>
          <dt>
            <span id="valueAddedTax">Value Added Tax</span>
          </dt>
          <dd>{taxRuleEntity.valueAddedTax}</dd>
          <dt>
            <span id="withholdingVAT">Withholding VAT</span>
          </dt>
          <dd>{taxRuleEntity.withholdingVAT}</dd>
          <dt>
            <span id="withholdingTaxConsultancy">Withholding Tax Consultancy</span>
          </dt>
          <dd>{taxRuleEntity.withholdingTaxConsultancy}</dd>
          <dt>
            <span id="withholdingTaxRent">Withholding Tax Rent</span>
          </dt>
          <dd>{taxRuleEntity.withholdingTaxRent}</dd>
          <dt>
            <span id="cateringLevy">Catering Levy</span>
          </dt>
          <dd>{taxRuleEntity.cateringLevy}</dd>
          <dt>
            <span id="serviceCharge">Service Charge</span>
          </dt>
          <dd>{taxRuleEntity.serviceCharge}</dd>
          <dt>
            <span id="withholdingTaxImportedService">Withholding Tax Imported Service</span>
          </dt>
          <dd>{taxRuleEntity.withholdingTaxImportedService}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{taxRuleEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{taxRuleEntity.compilationToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {taxRuleEntity.placeholders
              ? taxRuleEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {taxRuleEntity.placeholders && i === taxRuleEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/tax-rule" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tax-rule/${taxRuleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaxRuleDetail;
