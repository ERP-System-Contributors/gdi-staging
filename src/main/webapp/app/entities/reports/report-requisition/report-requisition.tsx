import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { openFile, byteSize, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IReportRequisition } from 'app/shared/model/reports/report-requisition.model';
import { searchEntities, getEntities } from './report-requisition.reducer';

export const ReportRequisition = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const reportRequisitionList = useAppSelector(state => state.reportRequisition.entities);
  const loading = useAppSelector(state => state.reportRequisition.loading);
  const totalItems = useAppSelector(state => state.reportRequisition.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="report-requisition-heading" data-cy="ReportRequisitionHeading">
        Report Requisitions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/report-requisition/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Report Requisition
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {reportRequisitionList && reportRequisitionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportName')}>
                  Report Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportRequestTime')}>
                  Report Request Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportPassword')}>
                  Report Password <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportStatus')}>
                  Report Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportId')}>
                  Report Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFileAttachment')}>
                  Report File Attachment <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFileCheckSum')}>
                  Report File Check Sum <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportNotes')}>
                  Report Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Template <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Content Type <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reportRequisitionList.map((reportRequisition, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/report-requisition/${reportRequisition.id}`} color="link" size="sm">
                      {reportRequisition.id}
                    </Button>
                  </td>
                  <td>{reportRequisition.reportName}</td>
                  <td>
                    {reportRequisition.reportRequestTime ? (
                      <TextFormat type="date" value={reportRequisition.reportRequestTime} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{reportRequisition.reportPassword}</td>
                  <td>{reportRequisition.reportStatus}</td>
                  <td>{reportRequisition.reportId}</td>
                  <td>
                    {reportRequisition.reportFileAttachment ? (
                      <div>
                        {reportRequisition.reportFileAttachmentContentType ? (
                          <a onClick={openFile(reportRequisition.reportFileAttachmentContentType, reportRequisition.reportFileAttachment)}>
                            Open &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {reportRequisition.reportFileAttachmentContentType}, {byteSize(reportRequisition.reportFileAttachment)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{reportRequisition.reportFileCheckSum}</td>
                  <td>
                    {reportRequisition.reportNotes ? (
                      <div>
                        {reportRequisition.reportNotesContentType ? (
                          <a onClick={openFile(reportRequisition.reportNotesContentType, reportRequisition.reportNotes)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {reportRequisition.reportNotesContentType}, {byteSize(reportRequisition.reportNotes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {reportRequisition.reportTemplate ? (
                      <Link to={`/report-template/${reportRequisition.reportTemplate.id}`}>
                        {reportRequisition.reportTemplate.catalogueNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportRequisition.reportContentType ? (
                      <Link to={`/report-content-type/${reportRequisition.reportContentType.id}`}>
                        {reportRequisition.reportContentType.reportTypeName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/report-requisition/${reportRequisition.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/report-requisition/${reportRequisition.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/report-requisition/${reportRequisition.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Report Requisitions found</div>
        )}
      </div>
      {totalItems ? (
        <div className={reportRequisitionList && reportRequisitionList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReportRequisition;
