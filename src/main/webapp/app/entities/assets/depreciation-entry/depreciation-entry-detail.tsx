import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-entry.reducer';

export const DepreciationEntryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationEntryEntity = useAppSelector(state => state.depreciationEntry.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationEntryDetailsHeading">Depreciation Entry</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationEntryEntity.id}</dd>
          <dt>
            <span id="postedAt">Posted At</span>
          </dt>
          <dd>
            {depreciationEntryEntity.postedAt ? (
              <TextFormat value={depreciationEntryEntity.postedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="depreciationAmount">Depreciation Amount</span>
          </dt>
          <dd>{depreciationEntryEntity.depreciationAmount}</dd>
          <dt>
            <span id="assetNumber">Asset Number</span>
          </dt>
          <dd>{depreciationEntryEntity.assetNumber}</dd>
          <dt>Service Outlet</dt>
          <dd>{depreciationEntryEntity.serviceOutlet ? depreciationEntryEntity.serviceOutlet.outletCode : ''}</dd>
          <dt>Asset Category</dt>
          <dd>{depreciationEntryEntity.assetCategory ? depreciationEntryEntity.assetCategory.assetCategoryName : ''}</dd>
          <dt>Depreciation Method</dt>
          <dd>{depreciationEntryEntity.depreciationMethod ? depreciationEntryEntity.depreciationMethod.depreciationMethodName : ''}</dd>
          <dt>Asset Registration</dt>
          <dd>{depreciationEntryEntity.assetRegistration ? depreciationEntryEntity.assetRegistration.assetNumber : ''}</dd>
          <dt>Depreciation Period</dt>
          <dd>{depreciationEntryEntity.depreciationPeriod ? depreciationEntryEntity.depreciationPeriod.endDate : ''}</dd>
          <dt>Fiscal Month</dt>
          <dd>{depreciationEntryEntity.fiscalMonth ? depreciationEntryEntity.fiscalMonth.fiscalMonthCode : ''}</dd>
          <dt>Fiscal Quarter</dt>
          <dd>{depreciationEntryEntity.fiscalQuarter ? depreciationEntryEntity.fiscalQuarter.fiscalQuarterCode : ''}</dd>
          <dt>Fiscal Year</dt>
          <dd>{depreciationEntryEntity.fiscalYear ? depreciationEntryEntity.fiscalYear.fiscalYearCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/depreciation-entry" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-entry/${depreciationEntryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationEntryDetail;
