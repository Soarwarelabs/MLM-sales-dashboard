import { Route } from "react-router-dom";
import { Shops } from "pages/Shops";
import { Agents } from "pages/Agents";
import { Managers } from "pages/Managers";
import { Dashboard } from "pages/Dashboard";
import { Accountants } from "pages/Accountants";
import { Inquiries } from "pages/Inquiries";
import { Areas } from "pages/Area";
import { RegistrationInquiries } from "pages/InquiriesRegistration";
import { Transactions } from "pages/Transactions";
import { AllTransactions } from "pages/AllTransactions";
import { InquiriesAccount } from "pages/InquiriesAccount/";
import { ComplaintRegistration } from "pages/ComplaintRegistration";
import { RootState } from "interfaces/redux/store";
import { useSelector } from "react-redux";
const Content = () => {
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      {role?.code !== "acc" &&
        role?.code !== "crm" &&
        role?.code !== "macc" && (
          <Route exact path="/shops" component={Shops} />
        )}
      {role?.code !== "acc" && role?.code !== "crm" && (
        <Route exact path="/agents" component={Agents} />
      )}
      {(role?.code === "admin" || role?.code === "head") && (
        <Route exact path="/managers" component={Managers} />
      )}
      {role?.code === "admin" && (
        <Route exact path="/accountants" component={Accountants} />
      )}
      <Route exact path="inquiries/tech" component={Inquiries} />
      {role?.code !== "acc" &&
        role?.code !== "crm" &&
        role?.code !== "tech" && (
          <Route
            exact
            path="/inquiries/sales"
            component={RegistrationInquiries}
          />
        )}
      {role?.code === "acc" && (
        <Route exact path="/inquiries/accounts" component={InquiriesAccount} />
      )}
      {role?.code !== "acc" && role?.code !== "crm" && (
        <Route exact path="/area" component={Areas} />
      )}
      {role?.code !== "acc" && role?.code !== "crm" && (
        <Route exact path="/shops/transactions" component={Transactions} />
      )}
      {(role?.code === "acc" ||
        role?.code === "admin" ||
        role?.code === "macc" ||
        role?.code === "head") && (
        <Route exact path="/transactions" component={AllTransactions} />
      )}
      {(role?.code === "crm" || role?.code === "admin") && (
        <Route exact path="/complaints" component={ComplaintRegistration} />
      )}
    </>
  );
};

export default Content;
