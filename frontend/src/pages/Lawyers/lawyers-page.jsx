import React, { useEffect } from "react";
// import lawyers from '../../lawyers'
import { Row, Col } from "react-bootstrap";
import Lawyer from "../../components/Lawyer/lawyer-component";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { listLawyers } from "../../actions/lawyerActions.js";
const LawyersPage = ({ history, match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const lawyerList = useSelector((state) => state.lawyerList);
  const { loading, error, lawyers } = lawyerList;
  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userType === "lawyer" || userInfo.userType === "admin")
    )
      history.push("/");
    dispatch(listLawyers(keyword));
  }, [dispatch, history, userInfo,keyword]);
  // const lawyers=[]
  return (
    <>
      <h1>OUR LAWYERS</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {lawyers.map((lawyer) =>
            lawyer.isVerified ? (
              <Col key={lawyer._id} sm={12} md={6} lg={4} xl={3}>
                <Lawyer key={lawyer._id} lawyer={lawyer} />
              </Col>
            ) : (
              ""
            )
          )}
        </Row>
      )}
    </>
  );
};

export default LawyersPage;
