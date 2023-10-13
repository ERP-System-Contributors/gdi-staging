import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICollateralInformation } from 'app/shared/model/gdi-data/collateral-information.model';
import { searchEntities, getEntities } from './collateral-information.reducer';

export const CollateralInformation = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const collateralInformationList = useAppSelector(state => state.collateralInformation.entities);
  const loading = useAppSelector(state => state.collateralInformation.loading);
  const totalItems = useAppSelector(state => state.collateralInformation.totalItems);

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
      <h2 id="collateral-information-heading" data-cy="CollateralInformationHeading">
        Collateral Informations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/collateral-information/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Collateral Information
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
        {collateralInformationList && collateralInformationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportingDate')}>
                  Reporting Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralId')}>
                  Collateral Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('loanContractId')}>
                  Loan Contract Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('customerId')}>
                  Customer Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('registrationPropertyNumber')}>
                  Registration Property Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralOMVInCCY')}>
                  Collateral OMV In CCY <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralFSVInLCY')}>
                  Collateral FSV In LCY <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralDiscountedValue')}>
                  Collateral Discounted Value <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('amountCharged')}>
                  Amount Charged <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralDiscountRate')}>
                  Collateral Discount Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('loanToValueRatio')}>
                  Loan To Value Ratio <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nameOfPropertyValuer')}>
                  Name Of Property Valuer <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('collateralLastValuationDate')}>
                  Collateral Last Valuation Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('insuredFlag')}>
                  Insured Flag <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nameOfInsurer')}>
                  Name Of Insurer <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('amountInsured')}>
                  Amount Insured <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('insuranceExpiryDate')}>
                  Insurance Expiry Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('guaranteeInsurers')}>
                  Guarantee Insurers <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Bank Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Branch Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Collateral Type <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  County Code <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {collateralInformationList.map((collateralInformation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/collateral-information/${collateralInformation.id}`} color="link" size="sm">
                      {collateralInformation.id}
                    </Button>
                  </td>
                  <td>
                    {collateralInformation.reportingDate ? (
                      <TextFormat type="date" value={collateralInformation.reportingDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{collateralInformation.collateralId}</td>
                  <td>{collateralInformation.loanContractId}</td>
                  <td>{collateralInformation.customerId}</td>
                  <td>{collateralInformation.registrationPropertyNumber}</td>
                  <td>{collateralInformation.collateralOMVInCCY}</td>
                  <td>{collateralInformation.collateralFSVInLCY}</td>
                  <td>{collateralInformation.collateralDiscountedValue}</td>
                  <td>{collateralInformation.amountCharged}</td>
                  <td>{collateralInformation.collateralDiscountRate}</td>
                  <td>{collateralInformation.loanToValueRatio}</td>
                  <td>{collateralInformation.nameOfPropertyValuer}</td>
                  <td>
                    {collateralInformation.collateralLastValuationDate ? (
                      <TextFormat type="date" value={collateralInformation.collateralLastValuationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{collateralInformation.insuredFlag}</td>
                  <td>{collateralInformation.nameOfInsurer}</td>
                  <td>{collateralInformation.amountInsured}</td>
                  <td>
                    {collateralInformation.insuranceExpiryDate ? (
                      <TextFormat type="date" value={collateralInformation.insuranceExpiryDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{collateralInformation.guaranteeInsurers}</td>
                  <td>
                    {collateralInformation.bankCode ? (
                      <Link to={`/institution-code/${collateralInformation.bankCode.id}`}>
                        {collateralInformation.bankCode.institutionName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {collateralInformation.branchCode ? (
                      <Link to={`/bank-branch-code/${collateralInformation.branchCode.id}`}>
                        {collateralInformation.branchCode.branchCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {collateralInformation.collateralType ? (
                      <Link to={`/collateral-type/${collateralInformation.collateralType.id}`}>
                        {collateralInformation.collateralType.collateralType}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {collateralInformation.countyCode ? (
                      <Link to={`/county-sub-county-code/${collateralInformation.countyCode.id}`}>
                        {collateralInformation.countyCode.subCountyName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/collateral-information/${collateralInformation.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/collateral-information/${collateralInformation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/collateral-information/${collateralInformation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Collateral Informations found</div>
        )}
      </div>
      {totalItems ? (
        <div className={collateralInformationList && collateralInformationList.length > 0 ? '' : 'd-none'}>
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

export default CollateralInformation;
