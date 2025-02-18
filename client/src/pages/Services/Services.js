import React from 'react';
import './Services.css'; 
import DocumentTitle from 'react-document-title';

export const Services = () => {
    return (
        <main className="serviceintrocontainer">
            <DocumentTitle title="Services | The Wheaton Group, LLC"></DocumentTitle>
            
            {/* Services Intro */}
            <section className="servicesintro">
                <span>Services</span>
                <h1>Direct Placement and Contract Recruiting.</h1>
            </section>

            <div className="servicesimgcontainer">
                <img 
                    className="servicesimg"
                    src="assets/images/servicesimg.jpg"
                    alt="Our Services"
                />
            </div>

            <section className="servicescontainer">
                <section className="directplacement">
                    <h2>Direct Placement</h2>
                    <p>
                        Our direct placement service is designed to help you fill critical 
                        positions that have remained open for extended periods. We specialize 
                        in sourcing and securing top-tier talent for roles that have been vacant 
                        for 30 days or longer. With our 90-day guarantee, you can trust that the 
                        candidates we place will meet your expectations. This service is cost-effective, 
                        as clients only pay for positions that we successfully fill, ensuring a 
                        risk-free recruitment process.
                    </p>
                </section>

                <section className="contractrecruiting">
                    <h2>Contract Recruiting</h2>
                    <p>
                        Ideal for projects requiring flexibility, our contract recruiting service 
                        supports your short-term or long-term hiring needs. Whether you are managing 
                        surge efforts or proposal-based demands, we provide skilled professionals on 
                        a pay-by-hour basis. Our contracts are designed with your convenience in mind, 
                        allowing you to scale your workforce as needed and cancel at any time without 
                        penalties. This solution ensures agility and efficiency for your evolving business needs.
                    </p>
                </section>
            </section>

            <div className="servicesimgcontainer">
                <img 
                    className="servicesimg2"
                    src="assets/images/servicesimg-bottom.jpg"
                    alt="Bottom Services"
                />
            </div>
        </main>
    );
};

export default Services;