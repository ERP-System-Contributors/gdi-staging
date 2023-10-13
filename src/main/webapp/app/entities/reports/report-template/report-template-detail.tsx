import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './report-template.reducer';

export const ReportTemplateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reportTemplateEntity = useAppSelector(state => state.reportTemplate.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reportTemplateDetailsHeading">Report Template</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reportTemplateEntity.id}</dd>
          <dt>
            <span id="catalogueNumber">Catalogue Number</span>
          </dt>
          <dd>{reportTemplateEntity.catalogueNumber}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{reportTemplateEntity.description}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>
            {reportTemplateEntity.notes ? (
              <div>
                {reportTemplateEntity.notesContentType ? (
                  <a onClick={openFile(reportTemplateEntity.notesContentType, reportTemplateEntity.notes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportTemplateEntity.notesContentType}, {byteSize(reportTemplateEntity.notes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="reportFile">Report File</span>
          </dt>
          <dd>
            {reportTemplateEntity.reportFile ? (
              <div>
                {reportTemplateEntity.reportFileContentType ? (
                  <a onClick={openFile(reportTemplateEntity.reportFileContentType, reportTemplateEntity.reportFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportTemplateEntity.reportFileContentType}, {byteSize(reportTemplateEntity.reportFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="compileReportFile">Compile Report File</span>
          </dt>
          <dd>
            {reportTemplateEntity.compileReportFile ? (
              <div>
                {reportTemplateEntity.compileReportFileContentType ? (
                  <a onClick={openFile(reportTemplateEntity.compileReportFileContentType, reportTemplateEntity.compileReportFile)}>
                    Open&nbsp;
                  </a>
                ) : null}
                <span>
                  {reportTemplateEntity.compileReportFileContentType}, {byteSize(reportTemplateEntity.compileReportFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {reportTemplateEntity.placeholders
              ? reportTemplateEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {reportTemplateEntity.placeholders && i === reportTemplateEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/report-template" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report-template/${reportTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReportTemplateDetail;
