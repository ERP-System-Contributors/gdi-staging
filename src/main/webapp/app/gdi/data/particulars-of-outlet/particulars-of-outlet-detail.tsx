import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './particulars-of-outlet.reducer';

export const ParticularsOfOutletDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const particularsOfOutletEntity = useAppSelector(state => state.particularsOfOutlet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="particularsOfOutletDetailsHeading">Particulars Of Outlet</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{particularsOfOutletEntity.id}</dd>
          <dt>
            <span id="businessReportingDate">Business Reporting Date</span>
          </dt>
          <dd>
            {particularsOfOutletEntity.businessReportingDate ? (
              <TextFormat value={particularsOfOutletEntity.businessReportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="outletName">Outlet Name</span>
          </dt>
          <dd>{particularsOfOutletEntity.outletName}</dd>
          <dt>
            <span id="town">Town</span>
          </dt>
          <dd>{particularsOfOutletEntity.town}</dd>
          <dt>
            <span id="iso6709Latitute">Iso 6709 Latitute</span>
          </dt>
          <dd>{particularsOfOutletEntity.iso6709Latitute}</dd>
          <dt>
            <span id="iso6709Longitude">Iso 6709 Longitude</span>
          </dt>
          <dd>{particularsOfOutletEntity.iso6709Longitude}</dd>
          <dt>
            <span id="cbkApprovalDate">Cbk Approval Date</span>
          </dt>
          <dd>
            {particularsOfOutletEntity.cbkApprovalDate ? (
              <TextFormat value={particularsOfOutletEntity.cbkApprovalDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="outletOpeningDate">Outlet Opening Date</span>
          </dt>
          <dd>
            {particularsOfOutletEntity.outletOpeningDate ? (
              <TextFormat value={particularsOfOutletEntity.outletOpeningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="outletClosureDate">Outlet Closure Date</span>
          </dt>
          <dd>
            {particularsOfOutletEntity.outletClosureDate ? (
              <TextFormat value={particularsOfOutletEntity.outletClosureDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="licenseFeePayable">License Fee Payable</span>
          </dt>
          <dd>{particularsOfOutletEntity.licenseFeePayable}</dd>
          <dt>Sub County Code</dt>
          <dd>{particularsOfOutletEntity.subCountyCode ? particularsOfOutletEntity.subCountyCode.subCountyName : ''}</dd>
          <dt>Bank Code</dt>
          <dd>{particularsOfOutletEntity.bankCode ? particularsOfOutletEntity.bankCode.institutionName : ''}</dd>
          <dt>Outlet Id</dt>
          <dd>{particularsOfOutletEntity.outletId ? particularsOfOutletEntity.outletId.branchCode : ''}</dd>
          <dt>Type Of Outlet</dt>
          <dd>{particularsOfOutletEntity.typeOfOutlet ? particularsOfOutletEntity.typeOfOutlet.outletType : ''}</dd>
          <dt>Outlet Status</dt>
          <dd>{particularsOfOutletEntity.outletStatus ? particularsOfOutletEntity.outletStatus.branchStatusType : ''}</dd>
        </dl>
        <Button tag={Link} to="/particulars-of-outlet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/particulars-of-outlet/${particularsOfOutletEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ParticularsOfOutletDetail;
