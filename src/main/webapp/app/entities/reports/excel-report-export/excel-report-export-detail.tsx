import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './excel-report-export.reducer';

export const ExcelReportExportDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const excelReportExportEntity = useAppSelector(state => state.excelReportExport.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="excelReportExportDetailsHeading">Excel Report Export</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{excelReportExportEntity.id}</dd>
          <dt>
            <span id="reportName">Report Name</span>
          </dt>
          <dd>{excelReportExportEntity.reportName}</dd>
          <dt>
            <span id="reportPassword">Report Password</span>
          </dt>
          <dd>{excelReportExportEntity.reportPassword}</dd>
          <dt>
            <span id="reportNotes">Report Notes</span>
          </dt>
          <dd>
            {excelReportExportEntity.reportNotes ? (
              <div>
                {excelReportExportEntity.reportNotesContentType ? (
                  <a onClick={openFile(excelReportExportEntity.reportNotesContentType, excelReportExportEntity.reportNotes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {excelReportExportEntity.reportNotesContentType}, {byteSize(excelReportExportEntity.reportNotes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileCheckSum">File Check Sum</span>
          </dt>
          <dd>{excelReportExportEntity.fileCheckSum}</dd>
          <dt>
            <span id="reportFile">Report File</span>
          </dt>
          <dd>
            {excelReportExportEntity.reportFile ? (
              <div>
                {excelReportExportEntity.reportFileContentType ? (
                  <a onClick={openFile(excelReportExportEntity.reportFileContentType, excelReportExportEntity.reportFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {excelReportExportEntity.reportFileContentType}, {byteSize(excelReportExportEntity.reportFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="reportTimeStamp">Report Time Stamp</span>
          </dt>
          <dd>
            {excelReportExportEntity.reportTimeStamp ? (
              <TextFormat value={excelReportExportEntity.reportTimeStamp} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reportId">Report Id</span>
          </dt>
          <dd>{excelReportExportEntity.reportId}</dd>
          <dt>Placeholder</dt>
          <dd>
            {excelReportExportEntity.placeholders
              ? excelReportExportEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {excelReportExportEntity.placeholders && i === excelReportExportEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {excelReportExportEntity.parameters
              ? excelReportExportEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {excelReportExportEntity.parameters && i === excelReportExportEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Report Status</dt>
          <dd>{excelReportExportEntity.reportStatus ? excelReportExportEntity.reportStatus.id : ''}</dd>
          <dt>Security Clearance</dt>
          <dd>{excelReportExportEntity.securityClearance ? excelReportExportEntity.securityClearance.clearanceLevel : ''}</dd>
          <dt>Report Creator</dt>
          <dd>{excelReportExportEntity.reportCreator ? excelReportExportEntity.reportCreator.applicationIdentity : ''}</dd>
          <dt>Organization</dt>
          <dd>{excelReportExportEntity.organization ? excelReportExportEntity.organization.dealerName : ''}</dd>
          <dt>Department</dt>
          <dd>{excelReportExportEntity.department ? excelReportExportEntity.department.dealerName : ''}</dd>
          <dt>System Module</dt>
          <dd>{excelReportExportEntity.systemModule ? excelReportExportEntity.systemModule.moduleName : ''}</dd>
          <dt>Report Design</dt>
          <dd>{excelReportExportEntity.reportDesign ? excelReportExportEntity.reportDesign.designation : ''}</dd>
          <dt>File Check Sum Algorithm</dt>
          <dd>{excelReportExportEntity.fileCheckSumAlgorithm ? excelReportExportEntity.fileCheckSumAlgorithm.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/excel-report-export" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/excel-report-export/${excelReportExportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExcelReportExportDetail;
