import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";

const Notifications = () => {
    const notificationOptions = [
        {
            name: "Daily Newsletter Notifications",
            description: "Receive updates and news about our newsletters daily via email.",
        },
        {
            name: "Weekly Newsletter Notifications",
            description: "Receive update and summaries about our newsletters weekly via email.",
        },
        {
            name: "Feedback and Surveys",
            description: "Provide feedback and participate in surveys to help us improve.",
        },
        {
            name: "Offers & Promotions",
            description: "Get notified about special offers and promotions.",
        },
        {
            name: "Account & Subscription Updates",
            description: "Get notified about updates to your account information and subscription status."
        },
        {
            name: "Phone Notifications",
            description: "Receive newsletter updates and account changes directly to your phone."
        }
      ];


    return (            
        <div className="content">

            <div>
                <h1 className='title'>
                    Notifications
                    <i className="pi pi-bell" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                    Select the kinds of notifications you get about your activities and recommendations.
                </p>
            </div>

            <div className="settings-content">
                {
                    notificationOptions.map((item, index) => (
                        <div className="option-container" key={`notification-${index}`}>
                            <div className="switch-container">
                                <InputSwitch style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="mini-desc-container">
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Button label="Save Preferences" className='auth-button' />

        </div>
    )
}

export default Notifications;