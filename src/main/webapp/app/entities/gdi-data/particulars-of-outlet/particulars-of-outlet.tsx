import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IParticularsOfOutlet } from 'app/shared/model/gdi-data/particulars-of-outlet.model';
import { searchEntities, getEntities } from './particulars-of-outlet.reducer';

export const ParticularsOfOutlet = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const particularsOfOutletList = useAppSelector(state => state.particularsOfOutlet.entities);
  const loading = useAppSelector(state => state.particularsOfOutlet.loading);
  const totalItems = useAppSelector(state => state.particularsOfOutlet.totalItems);

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
      <h2 id="particulars-of-outlet-heading" data-cy="ParticularsOfOutletHeading">
        Particulars Of Outlets
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/particulars-of-outlet/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Particulars Of Outlet
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
        {particularsOfOutletList && particularsOfOutletList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('businessReportingDate')}>
                  Business Reporting Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('outletName')}>
                  Outlet Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('town')}>
                  Town <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('iso6709Latitute')}>
                  Iso 6709 Latitute <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('iso6709Longitude')}>
                  Iso 6709 Longitude <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cbkApprovalDate')}>
                  Cbk Approval Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('outletOpeningDate')}>
                  Outlet Opening Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('outletClosureDate')}>
                  Outlet Closure Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('licenseFeePayable')}>
                  License Fee Payable <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Sub County Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Bank Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Outlet Id <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Type Of Outlet <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Outlet Status <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {particularsOfOutletList.map((particularsOfOutlet, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/particulars-of-outlet/${particularsOfOutlet.id}`} color="link" size="sm">
                      {particularsOfOutlet.id}
                    </Button>
                  </td>
                  <td>
                    {particularsOfOutlet.businessReportingDate ? (
                      <TextFormat type="date" value={particularsOfOutlet.businessReportingDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{particularsOfOutlet.outletName}</td>
                  <td>{particularsOfOutlet.town}</td>
                  <td>{particularsOfOutlet.iso6709Latitute}</td>
                  <td>{particularsOfOutlet.iso6709Longitude}</td>
                  <td>
                    {particularsOfOutlet.cbkApprovalDate ? (
                      <TextFormat type="date" value={particularsOfOutlet.cbkApprovalDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {particularsOfOutlet.outletOpeningDate ? (
                      <TextFormat type="date" value={particularsOfOutlet.outletOpeningDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {particularsOfOutlet.outletClosureDate ? (
                      <TextFormat type="date" value={particularsOfOutlet.outletClosureDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{particularsOfOutlet.licenseFeePayable}</td>
                  <td>
                    {particularsOfOutlet.subCountyCode ? (
                      <Link to={`/county-sub-county-code/${particularsOfOutlet.subCountyCode.id}`}>
                        {particularsOfOutlet.subCountyCode.subCountyName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {particularsOfOutlet.bankCode ? (
                      <Link to={`/institution-code/${particularsOfOutlet.bankCode.id}`}>
                        {particularsOfOutlet.bankCode.institutionName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {particularsOfOutlet.outletId ? (
                      <Link to={`/bank-branch-code/${particularsOfOutlet.outletId.id}`}>{particularsOfOutlet.outletId.branchCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {particularsOfOutlet.typeOfOutlet ? (
                      <Link to={`/outlet-type/${particularsOfOutlet.typeOfOutlet.id}`}>{particularsOfOutlet.typeOfOutlet.outletType}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {particularsOfOutlet.outletStatus ? (
                      <Link to={`/outlet-status/${particularsOfOutlet.outletStatus.id}`}>
                        {particularsOfOutlet.outletStatus.branchStatusType}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/particulars-of-outlet/${particularsOfOutlet.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/particulars-of-outlet/${particularsOfOutlet.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/particulars-of-outlet/${particularsOfOutlet.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Particulars Of Outlets found</div>
        )}
      </div>
      {totalItems ? (
        <div className={particularsOfOutletList && particularsOfOutletList.length > 0 ? '' : 'd-none'}>
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

export default ParticularsOfOutlet;
