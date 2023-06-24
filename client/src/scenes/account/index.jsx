import { Divider } from "primereact/divider";

import Support from "../accountSections/support"
import Overview from "../accountSections/overview";
import ChangeEmail from "../accountSections/changeEmail";
import Notifications from "../accountSections/notifications";
import ChangePassword from "../accountSections/changePassword";
import ChangeSubscription from "../accountSections/changeSubscription";

const Account = () => {
    return (
        <div className="container">

            <div className="main-content-alt">

                {/* ACCOUNT OVERVIEW SECTION */}
                <Overview />

                {/* SUBSCRIPTION SECTION */}
                <Divider />
                <ChangeSubscription />

                {/* NOTIFICATION SETTINGS */}
                <Divider />
                <Notifications />

                {/* CHANGE EMAIL */}
                <Divider />
                <ChangeEmail />

                {/* CHANGE PASSWORD */}
                <Divider />
                <ChangePassword />

                {/* SUPPORT SETTINGS */}
                <Divider />
                <Support />

            </div> 

        </div>
    )
}

export default Account;