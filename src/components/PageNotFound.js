import React from 'react';
import {Trans} from "react-i18next";

class PageNotFound extends React.Component {
    render() {
        return <section className="main_container">
            <section className="browse">
                <div>
                    <h4>{<Trans>pageNotExists</Trans>}</h4>
                </div>
            </section>
        </section>;
    }
}

export default PageNotFound;