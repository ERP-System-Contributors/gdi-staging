import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IAgencyNotice } from 'app/shared/model/tax/agency-notice.model';
import { AgencyStatusType } from 'app/shared/model/enumerations/agency-status-type.model';
import { getEntity, updateEntity, createEntity, reset } from './agency-notice.reducer';

export const AgencyNoticeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const dealers = useAppSelector(state => state.dealer.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const agencyNoticeEntity = useAppSelector(state => state.agencyNotice.entity);
  const loading = useAppSelector(state => state.agencyNotice.loading);
  const updating = useAppSelector(state => state.agencyNotice.updating);
  const updateSuccess = useAppSelector(state => state.agencyNotice.updateSuccess);
  const agencyStatusTypeValues = Object.keys(AgencyStatusType);

  const handleClose = () => {
    navigate('/agency-notice' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDealers({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getPlaceholders({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...agencyNoticeEntity,
      ...values,
      correspondents: mapIdList(values.correspondents),
      placeholders: mapIdList(values.placeholders),
      businessDocuments: mapIdList(values.businessDocuments),
      assessor: dealers.find(it => it.id.toString() === values.assessor.toString()),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
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
          agencyStatus: 'CLEARED',
          ...agencyNoticeEntity,
          correspondents: agencyNoticeEntity?.correspondents?.map(e => e.id.toString()),
          settlementCurrency: agencyNoticeEntity?.settlementCurrency?.id,
          assessor: agencyNoticeEntity?.assessor?.id,
          placeholders: agencyNoticeEntity?.placeholders?.map(e => e.id.toString()),
          businessDocuments: agencyNoticeEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.taxAgencyNotice.home.createOrEditLabel" data-cy="AgencyNoticeCreateUpdateHeading">
            Create or edit a Agency Notice
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="agency-notice-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reference Number"
                id="agency-notice-referenceNumber"
                name="referenceNumber"
                data-cy="referenceNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Reference Date"
                id="agency-notice-referenceDate"
                name="referenceDate"
                data-cy="referenceDate"
                type="date"
              />
              <ValidatedField
                label="Assessment Amount"
                id="agency-notice-assessmentAmount"
                name="assessmentAmount"
                data-cy="assessmentAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Agency Status"
                id="agency-notice-agencyStatus"
                name="agencyStatus"
                data-cy="agencyStatus"
                type="select"
              >
                {agencyStatusTypeValues.map(agencyStatusType => (
                  <option value={agencyStatusType} key={agencyStatusType}>
                    {agencyStatusType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label="Assessment Notice"
                id="agency-notice-assessmentNotice"
                name="assessmentNotice"
                data-cy="assessmentNotice"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Correspondents"
                id="agency-notice-correspondents"
                data-cy="correspondents"
                type="select"
                multiple
                name="correspondents"
              >
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="agency-notice-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                label="Settlement Currency"
                type="select"
              >
                <option value="" key="0" />
                {settlementCurrencies
                  ? settlementCurrencies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.iso4217CurrencyCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="agency-notice-assessor" name="assessor" data-cy="assessor" label="Assessor" type="select">
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="agency-notice-placeholder"
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
              <ValidatedField
                label="Business Document"
                id="agency-notice-businessDocument"
                data-cy="businessDocument"
                type="select"
                multiple
                name="businessDocuments"
              >
                <option value="" key="0" />
                {businessDocuments
                  ? businessDocuments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.documentTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/agency-notice" replace color="info">
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

export default AgencyNoticeUpdate;
