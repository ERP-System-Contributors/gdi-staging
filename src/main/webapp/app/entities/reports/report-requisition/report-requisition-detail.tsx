import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './report-requisition.reducer';

export const ReportRequisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reportRequisitionEntity = useAppSelector(state => state.reportRequisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reportRequisitionDetailsHeading">Report Requisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reportRequisitionEntity.id}</dd>
          <dt>
            <span id="reportName">Report Name</span>
          </dt>
          <dd>{reportRequisitionEntity.reportName}</dd>
          <dt>
            <span id="reportRequestTime">Report Request Time</span>
          </dt>
          <dd>
            {reportRequisitionEntity.reportRequestTime ? (
              <TextFormat value={reportRequisitionEntity.reportRequestTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reportPassword">Report Password</span>
          </dt>
          <dd>{reportRequisitionEntity.reportPassword}</dd>
          <dt>
            <span id="reportStatus">Report Status</span>
          </dt>
          <dd>{reportRequisitionEntity.reportStatus}</dd>
          <dt>
            <span id="reportId">Report Id</span>
          </dt>
          <dd>{reportRequisitionEntity.reportId}</dd>
          <dt>
            <span id="reportFileAttachment">Report File Attachment</span>
          </dt>
          <dd>
            {reportRequisitionEntity.reportFileAttachment ? (
              <div>
                {reportRequisitionEntity.reportFileAttachmentContentType ? (
                  <a
                    onClick={openFile(
                      reportRequisitionEntity.reportFileAttachmentContentType,
                      reportRequisitionEntity.reportFileAttachment
                    )}
                  >
                    Open&nbsp;
                  </a>
                ) : null}
                <span>
                  {reportRequisitionEntity.reportFileAttachmentContentType}, {byteSize(reportRequisitionEntity.reportFileAttachment)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="reportFileCheckSum">Report File Check Sum</span>
          </dt>
          <dd>{reportRequisitionEntity.reportFileCheckSum}</dd>
          <dt>
            <span id="reportNotes">Report Notes</span>
          </dt>
          <dd>
            {reportRequisitionEntity.reportNotes ? (
              <div>
                {reportRequisitionEntity.reportNotesContentType ? (
                  <a onClick={openFile(reportRequisitionEntity.reportNotesContentType, reportRequisitionEntity.reportNotes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportRequisitionEntity.reportNotesContentType}, {byteSize(reportRequisitionEntity.reportNotes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Placeholders</dt>
          <dd>
            {reportRequisitionEntity.placeholders
              ? reportRequisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {reportRequisitionEntity.placeholders && i === reportRequisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {reportRequisitionEntity.parameters
              ? reportRequisitionEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {reportRequisitionEntity.parameters && i === reportRequisitionEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Report Template</dt>
          <dd>{reportRequisitionEntity.reportTemplate ? reportRequisitionEntity.reportTemplate.catalogueNumber : ''}</dd>
          <dt>Report Content Type</dt>
          <dd>{reportRequisitionEntity.reportContentType ? reportRequisitionEntity.reportContentType.reportTypeName : ''}</dd>
        </dl>
        <Button tag={Link} to="/report-requisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report-requisition/${reportRequisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReportRequisitionDetail;
