import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ITaxRule } from 'app/shared/model/tax/tax-rule.model';
import { getEntity, updateEntity, createEntity, reset } from './tax-rule.reducer';

export const TaxRuleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const taxRuleEntity = useAppSelector(state => state.taxRule.entity);
  const loading = useAppSelector(state => state.taxRule.loading);
  const updating = useAppSelector(state => state.taxRule.updating);
  const updateSuccess = useAppSelector(state => state.taxRule.updateSuccess);

  const handleClose = () => {
    navigate('/tax-rule' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...taxRuleEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...taxRuleEntity,
          placeholders: taxRuleEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.taxTaxRule.home.createOrEditLabel" data-cy="TaxRuleCreateUpdateHeading">
            Create or edit a Tax Rule
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="tax-rule-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Telco Excise Duty"
                id="tax-rule-telcoExciseDuty"
                name="telcoExciseDuty"
                data-cy="telcoExciseDuty"
                type="text"
              />
              <ValidatedField
                label="Value Added Tax"
                id="tax-rule-valueAddedTax"
                name="valueAddedTax"
                data-cy="valueAddedTax"
                type="text"
              />
              <ValidatedField
                label="Withholding VAT"
                id="tax-rule-withholdingVAT"
                name="withholdingVAT"
                data-cy="withholdingVAT"
                type="text"
              />
              <ValidatedField
                label="Withholding Tax Consultancy"
                id="tax-rule-withholdingTaxConsultancy"
                name="withholdingTaxConsultancy"
                data-cy="withholdingTaxConsultancy"
                type="text"
              />
              <ValidatedField
                label="Withholding Tax Rent"
                id="tax-rule-withholdingTaxRent"
                name="withholdingTaxRent"
                data-cy="withholdingTaxRent"
                type="text"
              />
              <ValidatedField label="Catering Levy" id="tax-rule-cateringLevy" name="cateringLevy" data-cy="cateringLevy" type="text" />
              <ValidatedField label="Service Charge" id="tax-rule-serviceCharge" name="serviceCharge" data-cy="serviceCharge" type="text" />
              <ValidatedField
                label="Withholding Tax Imported Service"
                id="tax-rule-withholdingTaxImportedService"
                name="withholdingTaxImportedService"
                data-cy="withholdingTaxImportedService"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="tax-rule-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="tax-rule-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="tax-rule-placeholder"
                data-cy="placeholder"
                type="select"
                multiple
                name="placeholders"
              >
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/tax-rule" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaxRuleUpdate;
