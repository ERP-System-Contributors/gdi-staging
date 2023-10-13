import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { openFile, byteSize, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILeaseModelMetadata } from 'app/shared/model/leases/lease-model-metadata.model';
import { searchEntities, getEntities } from './lease-model-metadata.reducer';

export const LeaseModelMetadata = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const leaseModelMetadataList = useAppSelector(state => state.leaseModelMetadata.entities);
  const loading = useAppSelector(state => state.leaseModelMetadata.loading);
  const totalItems = useAppSelector(state => state.leaseModelMetadata.totalItems);

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
      <h2 id="lease-model-metadata-heading" data-cy="LeaseModelMetadataHeading">
        Lease Model Metadata
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/lease-model-metadata/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Lease Model Metadata
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
        {leaseModelMetadataList && leaseModelMetadataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modelTitle')}>
                  Model Title <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modelVersion')}>
                  Model Version <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modelNotes')}>
                  Model Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('annualDiscountingRate')}>
                  Annual Discounting Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('commencementDate')}>
                  Commencement Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalDate')}>
                  Terminal Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalReportingPeriods')}>
                  Total Reporting Periods <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportingPeriodsPerYear')}>
                  Reporting Periods Per Year <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('settlementPeriodsPerYear')}>
                  Settlement Periods Per Year <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('initialLiabilityAmount')}>
                  Initial Liability Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('initialROUAmount')}>
                  Initial ROU Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalDepreciationPeriods')}>
                  Total Depreciation Periods <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Lease Contract <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Predecessor <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Liability Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Rou Asset Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Model Attachments <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Security Clearance <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Lease Liability Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Interest Payable Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Interest Expense Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Rou Asset Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Rou Depreciation Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Accrued Depreciation Account <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {leaseModelMetadataList.map((leaseModelMetadata, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/lease-model-metadata/${leaseModelMetadata.id}`} color="link" size="sm">
                      {leaseModelMetadata.id}
                    </Button>
                  </td>
                  <td>{leaseModelMetadata.modelTitle}</td>
                  <td>{leaseModelMetadata.modelVersion}</td>
                  <td>{leaseModelMetadata.description}</td>
                  <td>
                    {leaseModelMetadata.modelNotes ? (
                      <div>
                        {leaseModelMetadata.modelNotesContentType ? (
                          <a onClick={openFile(leaseModelMetadata.modelNotesContentType, leaseModelMetadata.modelNotes)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {leaseModelMetadata.modelNotesContentType}, {byteSize(leaseModelMetadata.modelNotes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{leaseModelMetadata.annualDiscountingRate}</td>
                  <td>
                    {leaseModelMetadata.commencementDate ? (
                      <TextFormat type="date" value={leaseModelMetadata.commencementDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {leaseModelMetadata.terminalDate ? (
                      <TextFormat type="date" value={leaseModelMetadata.terminalDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{leaseModelMetadata.totalReportingPeriods}</td>
                  <td>{leaseModelMetadata.reportingPeriodsPerYear}</td>
                  <td>{leaseModelMetadata.settlementPeriodsPerYear}</td>
                  <td>{leaseModelMetadata.initialLiabilityAmount}</td>
                  <td>{leaseModelMetadata.initialROUAmount}</td>
                  <td>{leaseModelMetadata.totalDepreciationPeriods}</td>
                  <td>
                    {leaseModelMetadata.leaseContract ? (
                      <Link to={`/lease-contract/${leaseModelMetadata.leaseContract.id}`}>
                        {leaseModelMetadata.leaseContract.bookingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.predecessor ? (
                      <Link to={`/lease-model-metadata/${leaseModelMetadata.predecessor.id}`}>
                        {leaseModelMetadata.predecessor.modelTitle}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.liabilityCurrency ? (
                      <Link to={`/settlement-currency/${leaseModelMetadata.liabilityCurrency.id}`}>
                        {leaseModelMetadata.liabilityCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.rouAssetCurrency ? (
                      <Link to={`/settlement-currency/${leaseModelMetadata.rouAssetCurrency.id}`}>
                        {leaseModelMetadata.rouAssetCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.modelAttachments ? (
                      <Link to={`/business-document/${leaseModelMetadata.modelAttachments.id}`}>
                        {leaseModelMetadata.modelAttachments.documentTitle}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.securityClearance ? (
                      <Link to={`/security-clearance/${leaseModelMetadata.securityClearance.id}`}>
                        {leaseModelMetadata.securityClearance.clearanceLevel}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.leaseLiabilityAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.leaseLiabilityAccount.id}`}>
                        {leaseModelMetadata.leaseLiabilityAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.interestPayableAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.interestPayableAccount.id}`}>
                        {leaseModelMetadata.interestPayableAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.interestExpenseAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.interestExpenseAccount.id}`}>
                        {leaseModelMetadata.interestExpenseAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.rouAssetAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.rouAssetAccount.id}`}>
                        {leaseModelMetadata.rouAssetAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.rouDepreciationAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.rouDepreciationAccount.id}`}>
                        {leaseModelMetadata.rouDepreciationAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseModelMetadata.accruedDepreciationAccount ? (
                      <Link to={`/transaction-account/${leaseModelMetadata.accruedDepreciationAccount.id}`}>
                        {leaseModelMetadata.accruedDepreciationAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/lease-model-metadata/${leaseModelMetadata.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/lease-model-metadata/${leaseModelMetadata.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/lease-model-metadata/${leaseModelMetadata.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Lease Model Metadata found</div>
        )}
      </div>
      {totalItems ? (
        <div className={leaseModelMetadataList && leaseModelMetadataList.length > 0 ? '' : 'd-none'}>
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

export default LeaseModelMetadata;
