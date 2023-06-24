const Overview = () => {
    return (
        <div className="content">

            {/* SECTION HEADER */}
            <div>
                <h1 className="title">
                    Account Overview
                    <i className="pi pi-id-card" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                    Look over your current account details below.
                </p>
            </div>

            {/* OVERVIEW SECTION */}
            <div className="settings-content">

                {/* NAME*/}
                <div className="sub-body-container">
                    <h3 className="sub-body-header">
                        Name
                    </h3>
                    <div className="sub-body-container-desc"> 
                        <p className="sub-body-info">Example Name</p>
                    </div>
                </div>

                {/* EMAIL */}
                <div className="sub-body-container">
                    <h3 className="sub-body-header">
                        Email
                    </h3>
                    <div className="sub-body-container-desc"> 
                        <p className="sub-body-info">test@example.com</p>
                    </div>
                </div>

                {/* PHONE NO. */}
                <div className="sub-body-container">
                    <h3 className="sub-body-header">
                        Phone Number
                    </h3>
                    <div className="sub-body-container-desc"> 
                        <p className="sub-body-info">(999) 999-9999</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Overview;