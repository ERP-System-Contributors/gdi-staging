import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { getEntities as getCountySubCountyCodes } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.reducer';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { IOutletType } from 'app/shared/model/gdi/outlet-type.model';
import { getEntities as getOutletTypes } from 'app/entities/gdi/outlet-type/outlet-type.reducer';
import { IOutletStatus } from 'app/shared/model/gdi/outlet-status.model';
import { getEntities as getOutletStatuses } from 'app/entities/gdi/outlet-status/outlet-status.reducer';
import { IParticularsOfOutlet } from 'app/shared/model/gdi-data/particulars-of-outlet.model';
import { getEntity, updateEntity, createEntity, reset } from './particulars-of-outlet.reducer';

export const ParticularsOfOutletUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const countySubCountyCodes = useAppSelector(state => state.countySubCountyCode.entities);
  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const outletTypes = useAppSelector(state => state.outletType.entities);
  const outletStatuses = useAppSelector(state => state.outletStatus.entities);
  const particularsOfOutletEntity = useAppSelector(state => state.particularsOfOutlet.entity);
  const loading = useAppSelector(state => state.particularsOfOutlet.loading);
  const updating = useAppSelector(state => state.particularsOfOutlet.updating);
  const updateSuccess = useAppSelector(state => state.particularsOfOutlet.updateSuccess);

  const handleClose = () => {
    navigate('/particulars-of-outlet' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCountySubCountyCodes({}));
    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getOutletTypes({}));
    dispatch(getOutletStatuses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...particularsOfOutletEntity,
      ...values,
      subCountyCode: countySubCountyCodes.find(it => it.id.toString() === values.subCountyCode.toString()),
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      outletId: bankBranchCodes.find(it => it.id.toString() === values.outletId.toString()),
      typeOfOutlet: outletTypes.find(it => it.id.toString() === values.typeOfOutlet.toString()),
      outletStatus: outletStatuses.find(it => it.id.toString() === values.outletStatus.toString()),
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
          ...particularsOfOutletEntity,
          subCountyCode: particularsOfOutletEntity?.subCountyCode?.id,
          bankCode: particularsOfOutletEntity?.bankCode?.id,
          outletId: particularsOfOutletEntity?.outletId?.id,
          typeOfOutlet: particularsOfOutletEntity?.typeOfOutlet?.id,
          outletStatus: particularsOfOutletEntity?.outletStatus?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataParticularsOfOutlet.home.createOrEditLabel" data-cy="ParticularsOfOutletCreateUpdateHeading">
            Create or edit a Particulars Of Outlet
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
                <ValidatedField name="id" required readOnly id="particulars-of-outlet-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Business Reporting Date"
                id="particulars-of-outlet-businessReportingDate"
                name="businessReportingDate"
                data-cy="businessReportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Outlet Name"
                id="particulars-of-outlet-outletName"
                name="outletName"
                data-cy="outletName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Town"
                id="particulars-of-outlet-town"
                name="town"
                data-cy="town"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Iso 6709 Latitute"
                id="particulars-of-outlet-iso6709Latitute"
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
                id="particulars-of-outlet-iso6709Longitude"
                name="iso6709Longitude"
                data-cy="iso6709Longitude"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Cbk Approval Date"
                id="particulars-of-outlet-cbkApprovalDate"
                name="cbkApprovalDate"
                data-cy="cbkApprovalDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Outlet Opening Date"
                id="particulars-of-outlet-outletOpeningDate"
                name="outletOpeningDate"
                data-cy="outletOpeningDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Outlet Closure Date"
                id="particulars-of-outlet-outletClosureDate"
                name="outletClosureDate"
                data-cy="outletClosureDate"
                type="date"
              />
              <ValidatedField
                label="License Fee Payable"
                id="particulars-of-outlet-licenseFeePayable"
                name="licenseFeePayable"
                data-cy="licenseFeePayable"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="particulars-of-outlet-subCountyCode"
                name="subCountyCode"
                data-cy="subCountyCode"
                label="Sub County Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {countySubCountyCodes
                  ? countySubCountyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.subCountyName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="particulars-of-outlet-bankCode"
                name="bankCode"
                data-cy="bankCode"
                label="Bank Code"
                type="select"
                required
              >
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
              <ValidatedField
                id="particulars-of-outlet-outletId"
                name="outletId"
                data-cy="outletId"
                label="Outlet Id"
                type="select"
                required
              >
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
              <ValidatedField
                id="particulars-of-outlet-typeOfOutlet"
                name="typeOfOutlet"
                data-cy="typeOfOutlet"
                label="Type Of Outlet"
                type="select"
                required
              >
                <option value="" key="0" />
                {outletTypes
                  ? outletTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.outletType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="particulars-of-outlet-outletStatus"
                name="outletStatus"
                data-cy="outletStatus"
                label="Outlet Status"
                type="select"
                required
              >
                <option value="" key="0" />
                {outletStatuses
                  ? outletStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.branchStatusType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/particulars-of-outlet" replace color="info">
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

export default ParticularsOfOutletUpdate;
