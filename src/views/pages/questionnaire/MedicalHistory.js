
import React from 'react';
import { Row, Container } from 'reactstrap';
import { CheckBoxGroup, RadioGroup } from './Components';
import { Field } from 'formik';
import {
  age_names_and_labels,
  underlying_condition_names_and_labels,
  sex_names_and_labels,
} from './QuestionSpecs';

import { connect } from "react-redux";
import { setAuth } from "redux/actions/auth/authAction";

import NumericInput from 'react-numeric-input';

const AgeField = props => {
  return <NumericInput mobile
    value={props.form.values["age"]}
    onChange={(value) => {
      props.form.setFieldValue("age", value);
    }} />
}

export const MedicalHistoryPage = props => {
  if (
    (props.values.age && props.values.sex) &&
    (props.auth.login.isAuthenticated || localStorage.getItem("user_info"))
  ) {
    props.setNextDisabled(false)
  }
  return (
    <Container style={{ marginBottom: 40 }}>
      <Row>
        <h4>How old are you?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field component={AgeField} />
      </Row>
      <Row>
        <h4>What was your sex at birth?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field
          component={RadioGroup}
          names_and_labels={sex_names_and_labels}
          name="sex" />
      </Row>
      <Row>
        <h4>Please select any medical conditions you have.</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <CheckBoxGroup
          names_and_labels={underlying_condition_names_and_labels}
          values={props.values}
        />
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(MedicalHistoryPage);
