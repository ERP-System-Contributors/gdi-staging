import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './xlsx-report-requisition.reducer';

export const XlsxReportRequisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const xlsxReportRequisitionEntity = useAppSelector(state => state.xlsxReportRequisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="xlsxReportRequisitionDetailsHeading">Xlsx Report Requisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.id}</dd>
          <dt>
            <span id="reportName">Report Name</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.reportName}</dd>
          <dt>
            <span id="reportDate">Report Date</span>
          </dt>
          <dd>
            {xlsxReportRequisitionEntity.reportDate ? (
              <TextFormat value={xlsxReportRequisitionEntity.reportDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="userPassword">User Password</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.userPassword}</dd>
          <dt>
            <span id="reportFileChecksum">Report File Checksum</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.reportFileChecksum}</dd>
          <dt>
            <span id="reportStatus">Report Status</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.reportStatus}</dd>
          <dt>
            <span id="reportId">Report Id</span>
          </dt>
          <dd>{xlsxReportRequisitionEntity.reportId}</dd>
          <dt>Report Template</dt>
          <dd>{xlsxReportRequisitionEntity.reportTemplate ? xlsxReportRequisitionEntity.reportTemplate.catalogueNumber : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {xlsxReportRequisitionEntity.placeholders
              ? xlsxReportRequisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {xlsxReportRequisitionEntity.placeholders && i === xlsxReportRequisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {xlsxReportRequisitionEntity.parameters
              ? xlsxReportRequisitionEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {xlsxReportRequisitionEntity.parameters && i === xlsxReportRequisitionEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/xlsx-report-requisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/xlsx-report-requisition/${xlsxReportRequisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default XlsxReportRequisitionDetail;
