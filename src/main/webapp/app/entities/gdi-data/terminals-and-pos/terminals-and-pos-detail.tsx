import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './terminals-and-pos.reducer';

export const TerminalsAndPOSDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const terminalsAndPOSEntity = useAppSelector(state => state.terminalsAndPOS.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="terminalsAndPOSDetailsHeading">Terminals And POS</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{terminalsAndPOSEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {terminalsAndPOSEntity.reportingDate ? (
              <TextFormat value={terminalsAndPOSEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminalId">Terminal Id</span>
          </dt>
          <dd>{terminalsAndPOSEntity.terminalId}</dd>
          <dt>
            <span id="merchantId">Merchant Id</span>
          </dt>
          <dd>{terminalsAndPOSEntity.merchantId}</dd>
          <dt>
            <span id="terminalName">Terminal Name</span>
          </dt>
          <dd>{terminalsAndPOSEntity.terminalName}</dd>
          <dt>
            <span id="terminalLocation">Terminal Location</span>
          </dt>
          <dd>{terminalsAndPOSEntity.terminalLocation}</dd>
          <dt>
            <span id="iso6709Latitute">Iso 6709 Latitute</span>
          </dt>
          <dd>{terminalsAndPOSEntity.iso6709Latitute}</dd>
          <dt>
            <span id="iso6709Longitude">Iso 6709 Longitude</span>
          </dt>
          <dd>{terminalsAndPOSEntity.iso6709Longitude}</dd>
          <dt>
            <span id="terminalOpeningDate">Terminal Opening Date</span>
          </dt>
          <dd>
            {terminalsAndPOSEntity.terminalOpeningDate ? (
              <TextFormat value={terminalsAndPOSEntity.terminalOpeningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminalClosureDate">Terminal Closure Date</span>
          </dt>
          <dd>
            {terminalsAndPOSEntity.terminalClosureDate ? (
              <TextFormat value={terminalsAndPOSEntity.terminalClosureDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Terminal Type</dt>
          <dd>{terminalsAndPOSEntity.terminalType ? terminalsAndPOSEntity.terminalType.txnTerminalTypeCode : ''}</dd>
          <dt>Terminal Functionality</dt>
          <dd>{terminalsAndPOSEntity.terminalFunctionality ? terminalsAndPOSEntity.terminalFunctionality.terminalFunctionality : ''}</dd>
          <dt>Physical Location</dt>
          <dd>{terminalsAndPOSEntity.physicalLocation ? terminalsAndPOSEntity.physicalLocation.subCountyCode : ''}</dd>
          <dt>Bank Id</dt>
          <dd>{terminalsAndPOSEntity.bankId ? terminalsAndPOSEntity.bankId.institutionName : ''}</dd>
          <dt>Branch Id</dt>
          <dd>{terminalsAndPOSEntity.branchId ? terminalsAndPOSEntity.branchId.branchCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/terminals-and-pos" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/terminals-and-pos/${terminalsAndPOSEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TerminalsAndPOSDetail;
