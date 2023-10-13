import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITerminalTypes } from 'app/shared/model/gdi/terminal-types.model';
import { getEntities as getTerminalTypes } from 'app/entities/gdi/terminal-types/terminal-types.reducer';
import { ITerminalFunctions } from 'app/shared/model/gdi/terminal-functions.model';
import { getEntities as getTerminalFunctions } from 'app/entities/gdi/terminal-functions/terminal-functions.reducer';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { getEntities as getCountySubCountyCodes } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.reducer';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { ITerminalsAndPOS } from 'app/shared/model/gdi-data/terminals-and-pos.model';
import { getEntity, updateEntity, createEntity, reset } from './terminals-and-pos.reducer';

export const TerminalsAndPOSUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const terminalTypes = useAppSelector(state => state.terminalTypes.entities);
  const terminalFunctions = useAppSelector(state => state.terminalFunctions.entities);
  const countySubCountyCodes = useAppSelector(state => state.countySubCountyCode.entities);
  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const terminalsAndPOSEntity = useAppSelector(state => state.terminalsAndPOS.entity);
  const loading = useAppSelector(state => state.terminalsAndPOS.loading);
  const updating = useAppSelector(state => state.terminalsAndPOS.updating);
  const updateSuccess = useAppSelector(state => state.terminalsAndPOS.updateSuccess);

  const handleClose = () => {
    navigate('/terminals-and-pos' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTerminalTypes({}));
    dispatch(getTerminalFunctions({}));
    dispatch(getCountySubCountyCodes({}));
    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...terminalsAndPOSEntity,
      ...values,
      terminalType: terminalTypes.find(it => it.id.toString() === values.terminalType.toString()),
      terminalFunctionality: terminalFunctions.find(it => it.id.toString() === values.terminalFunctionality.toString()),
      physicalLocation: countySubCountyCodes.find(it => it.id.toString() === values.physicalLocation.toString()),
      bankId: institutionCodes.find(it => it.id.toString() === values.bankId.toString()),
      branchId: bankBranchCodes.find(it => it.id.toString() === values.branchId.toString()),
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
          ...terminalsAndPOSEntity,
          terminalType: terminalsAndPOSEntity?.terminalType?.id,
          terminalFunctionality: terminalsAndPOSEntity?.terminalFunctionality?.id,
          physicalLocation: terminalsAndPOSEntity?.physicalLocation?.id,
          bankId: terminalsAndPOSEntity?.bankId?.id,
          branchId: terminalsAndPOSEntity?.branchId?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataTerminalsAndPos.home.createOrEditLabel" data-cy="TerminalsAndPOSCreateUpdateHeading">
            Create or edit a Terminals And POS
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
                <ValidatedField name="id" required readOnly id="terminals-and-pos-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="terminals-and-pos-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Id"
                id="terminals-and-pos-terminalId"
                name="terminalId"
                data-cy="terminalId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Merchant Id"
                id="terminals-and-pos-merchantId"
                name="merchantId"
                data-cy="merchantId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Name"
                id="terminals-and-pos-terminalName"
                name="terminalName"
                data-cy="terminalName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Location"
                id="terminals-and-pos-terminalLocation"
                name="terminalLocation"
                data-cy="terminalLocation"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Iso 6709 Latitute"
                id="terminals-and-pos-iso6709Latitute"
                name="iso6709Latitute"
                data-cy="iso6709Latitute"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Iso 6709 Longitude"
                id="terminals-and-pos-iso6709Longitude"
                name="iso6709Longitude"
                data-cy="iso6709Longitude"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Terminal Opening Date"
                id="terminals-and-pos-terminalOpeningDate"
                name="terminalOpeningDate"
                data-cy="terminalOpeningDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Closure Date"
                id="terminals-and-pos-terminalClosureDate"
                name="terminalClosureDate"
                data-cy="terminalClosureDate"
                type="date"
              />
              <ValidatedField
                id="terminals-and-pos-terminalType"
                name="terminalType"
                data-cy="terminalType"
                label="Terminal Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {terminalTypes
                  ? terminalTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.txnTerminalTypeCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="terminals-and-pos-terminalFunctionality"
                name="terminalFunctionality"
                data-cy="terminalFunctionality"
                label="Terminal Functionality"
                type="select"
                required
              >
                <option value="" key="0" />
                {terminalFunctions
                  ? terminalFunctions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.terminalFunctionality}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="terminals-and-pos-physicalLocation"
                name="physicalLocation"
                data-cy="physicalLocation"
                label="Physical Location"
                type="select"
                required
              >
                <option value="" key="0" />
                {countySubCountyCodes
                  ? countySubCountyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.subCountyCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="terminals-and-pos-bankId" name="bankId" data-cy="bankId" label="Bank Id" type="select" required>
                <option value="" key="0" />
                {institutionCodes
                  ? institutionCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.institutionName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="terminals-and-pos-branchId" name="branchId" data-cy="branchId" label="Branch Id" type="select" required>
                <option value="" key="0" />
                {bankBranchCodes
                  ? bankBranchCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.branchCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/terminals-and-pos" replace color="info">
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

export default TerminalsAndPOSUpdate;
