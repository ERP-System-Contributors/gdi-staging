import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pdf-report-requisition.reducer';

export const PdfReportRequisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pdfReportRequisitionEntity = useAppSelector(state => state.pdfReportRequisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pdfReportRequisitionDetailsHeading">Pdf Report Requisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.id}</dd>
          <dt>
            <span id="reportName">Report Name</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.reportName}</dd>
          <dt>
            <span id="reportDate">Report Date</span>
          </dt>
          <dd>
            {pdfReportRequisitionEntity.reportDate ? (
              <TextFormat value={pdfReportRequisitionEntity.reportDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="userPassword">User Password</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.userPassword}</dd>
          <dt>
            <span id="ownerPassword">Owner Password</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.ownerPassword}</dd>
          <dt>
            <span id="reportFileChecksum">Report File Checksum</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.reportFileChecksum}</dd>
          <dt>
            <span id="reportStatus">Report Status</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.reportStatus}</dd>
          <dt>
            <span id="reportId">Report Id</span>
          </dt>
          <dd>{pdfReportRequisitionEntity.reportId}</dd>
          <dt>Report Template</dt>
          <dd>{pdfReportRequisitionEntity.reportTemplate ? pdfReportRequisitionEntity.reportTemplate.catalogueNumber : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {pdfReportRequisitionEntity.placeholders
              ? pdfReportRequisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {pdfReportRequisitionEntity.placeholders && i === pdfReportRequisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {pdfReportRequisitionEntity.parameters
              ? pdfReportRequisitionEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {pdfReportRequisitionEntity.parameters && i === pdfReportRequisitionEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/pdf-report-requisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pdf-report-requisition/${pdfReportRequisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PdfReportRequisitionDetail;
