import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { TransactionData } from "interfaces/pages/Shops/index";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputEndorment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { RootState } from "interfaces/redux/store";
import { useSelector } from "react-redux";
import { PaymentMethod, PaymentType } from "interfaces/redux/reducers/dropdown";
import * as Yup from "yup";
import axios from "axios";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 100px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 10px;
`;

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgb(0, 0, 0)", // (default alpha is 0.38)
    },
  },
})(TextField);

const Label = ({ label }: { label: string }) => {
  return (
    <Typography style={{ width: "200px" }} component="h2">
      {label}
    </Typography>
  );
};

interface ShopTransactionFormData {
  initialValues: TransactionData;
  onSubmit: (values: TransactionData) => void;
  editMode: boolean;
  // isCreatingOrEditing: boolean;
}

const ShopTransactionForm = ({
  initialValues,
  onSubmit,
  editMode,
}: ShopTransactionFormData) => {
  const [attach, setAttach] = useState<any>("");
  const [packages, setPackage] = useState<
    Array<{ uuid: string; amount: number; name: string }>
  >([]);
  const [amounts, setAmounts] = useState<number>(initialValues.paid_amount);
  const payment_methods = useSelector<RootState>(
    (state) => state.dropdown.payment_method
  ) as PaymentMethod[];
  const payment_types = useSelector<RootState>(
    (state) => state.dropdown.payment_types
  ) as PaymentType[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const payment_permissions = useSelector<RootState>(
    (state) => state.dropdown.payment_permissions
  ) as string[];
  const validationSchema = Yup.object({
    package: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      try {
        onSubmit({ ...values, attachment: attach, paid_amount: amounts });
      } catch (error) {}
    },
  });
  const getPlans = async () => {
    try {
      // setIsLoading(true);
      const { data } = await axios.get("plans/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // setShops(data);
      setPackage(data?.plans);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    getPlans();
  }, []);
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography
            style={{ paddingBottom: 20, fontWeight: "bold" }}
            variant="h5"
            gutterBottom
          >
            Add Transaction
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Section>
                <Label label="Transaction Date:" />
                <TextField
                  variant="outlined"
                  size="small"
                  type="date"
                  id="pay_date"
                  name="pay_date"
                  value={formik.values.pay_date}
                  onChange={formik.handleChange}
                  style={{ width: 180 }}
                />
              </Section>
            </Row>
            <Row>
              {" "}
              <Section>
                <Label label="Billing Date:" />
                <TextField
                  variant="outlined"
                  size="small"
                  type="date"
                  id="billing_date"
                  name="billing_date"
                  onChange={formik.handleChange}
                  value={formik.values.billing_date}
                  style={{ width: 180 }}
                />
              </Section>
            </Row>
            <Row>
              {" "}
              <Section>
                <Label label="Payment Method:" />
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  id="payment_method"
                  name="payment_method"
                  error={
                    formik.touched.payment_method &&
                    formik.errors.payment_method
                      ? true
                      : false
                  }
                  style={{ width: 180, height: 40 }}
                  value={formik.values.payment_method || ""}
                  onChange={formik.handleChange}
                >
                  {payment_methods.map((method) => {
                    return (
                      <MenuItem key={method.code} value={method.code}>
                        {method.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {formik.touched.payment_method &&
                formik.errors.payment_method ? (
                  <Typography
                    style={{ color: "red", fontSize: 12, marginLeft: "5px" }}
                  >
                    {formik.errors.payment_method}
                  </Typography>
                ) : null}
              </Section>
            </Row>
            <Row>
              <Section>
                <Label label="Package" />
                <DarkerDisabledTextField
                  select
                  size="small"
                  id="package"
                  name="package"
                  error={
                    formik.touched.package && formik.errors.package
                      ? true
                      : false
                  }
                  // disabled
                  value={formik.values.package}
                  onChange={(val) => {
                    formik.handleChange(val);
                    setAmounts(
                      packages.filter(
                        (pack) => pack.uuid === val.target.value
                      )[0].amount
                    );
                  }}
                  style={{ width: 180, height: 40, fontWeight: "bolder" }}
                  variant="outlined"
                >
                  {packages.map((method) => {
                    return (
                      <MenuItem key={method.uuid} value={method.uuid}>
                        {method.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                </DarkerDisabledTextField>
                {formik.touched.package && formik.errors.package ? (
                  <Typography style={{ color: "red", fontSize: 12 }}>
                    {formik.errors.package}
                  </Typography>
                ) : null}
              </Section>
            </Row>
            <Row>
              <Section>
                <Label label="Amount Paid in Rupees:" />
                <DarkerDisabledTextField
                  placeholder="0"
                  style={{ width: 180, height: 40 }}
                  disabled
                  variant="outlined"
                  size="small"
                  value={amounts}
                  onChange={formik.handleChange}
                  id="paid_amount"
                  name="paid_amount"
                  // startAdornment={
                  //   <InputEndorment position="start">Rs.</InputEndorment>
                  // }
                />
              </Section>
            </Row>{" "}
            <Row>
              {" "}
              <Section>
                <Label label="Payment Reference ID" />
                <OutlinedInput
                  placeholder=""
                  style={{ width: 180, height: 40 }}
                  value={formik.values.reference_id}
                  onChange={formik.handleChange}
                  id="reference_id"
                  name="reference_id"
                />
              </Section>
            </Row>
            <Row>
              <Section>
                <Label label="Payment Status:" />
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  id="payment_status"
                  name="payment_status"
                  error={
                    formik.touched.payment_status &&
                    formik.errors.payment_status
                      ? true
                      : false
                  }
                  style={{ width: 180, height: 40 }}
                  value={formik.values.payment_status}
                  onChange={formik.handleChange}
                >
                  {payment_permissions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                {formik.touched.payment_status &&
                formik.errors.payment_status ? (
                  <Typography
                    style={{ color: "red", fontSize: 12, marginLeft: "5px" }}
                  >
                    {formik.errors.payment_status}
                  </Typography>
                ) : null}
              </Section>
            </Row>
            <Row>
              <Section>
                <Label label="Payment Type:" />
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  id="pay_type"
                  name="pay_type"
                  error={
                    formik.touched.pay_type && formik.errors.pay_type
                      ? true
                      : false
                  }
                  style={{ width: 180, height: 40 }}
                  value={formik.values.pay_type}
                  onChange={formik.handleChange}
                >
                  {payment_types.map((type) => (
                    <MenuItem key={type.code} value={type.code}>
                      {type.name.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                {formik.touched.pay_type && formik.errors.pay_type ? (
                  <Typography
                    style={{ color: "red", fontSize: 12, marginLeft: "5px" }}
                  >
                    {formik.errors.pay_type}
                  </Typography>
                ) : null}
              </Section>
            </Row>
            <Row>
              <Section>
                <Label label="Comment :" />
                <OutlinedInput
                  placeholder="Please write your comment"
                  style={{ width: 180, height: 40 }}
                  value={formik.values.purpose}
                  onChange={formik.handleChange}
                  id="purpose"
                  name="purpose"
                />
              </Section>
            </Row>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: 10,
              }}
            >
              <Label label="Attachment:" />

              <input
                type="file"
                value={formik.values.attachment}
                id="attachment"
                name="attachment"
                accept="application/pdf,application/vnd.ms-excel,image/jpeg,image/png"
                multiple={false}
                onChange={(e) => {
                  formik.handleChange(e);
                  const file = e.target.files || [];
                  // const file = event.target.files[0] || null;
                  const reader = new FileReader();
                  reader.readAsDataURL(file[0]);
                  reader.onload = () => {
                    console.log(reader.result);
                    setAttach(reader.result);
                  };
                  // if (files.length > 0) {
                  //   const reader = new FileReader();
                  //   reader.addEventListener("load", (e) => {
                  //     const new_attachment = e.target?.result || null || "";

                  //     setAttach(new_attachment)

                  //   });
                  //   reader.readAsDataURL(files[0]);
                  // }
                }}
              />
            </div>
            <Button
              style={{ marginTop: 30 }}
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit Info
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export { ShopTransactionForm };
