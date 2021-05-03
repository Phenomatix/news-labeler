import React, { useState } from 'react'
import "../App.css";
import { Container } from 'semantic-ui-react'

function NewsBit(props) {

    const { newsItem, newsLoading, highlighting } = props;

    return (
        <Container
            textAlign={newsItem !== undefined ? 'justified' : 'center'}
            style={{ fontSize: '18px', fontFamily: 'Open Sans', color: '#203174', marginBottom: '5px'}}>
            <p className={`element${highlighting ? " highlight" : ""}`}> 
                {newsLoading ? "Loading..." : (newsItem !== undefined ? newsItem : "Well Done! Email phenomatix@gmail.com to request another Batch.")}
            </p>
        </Container>
    );
}

export default NewsBit;